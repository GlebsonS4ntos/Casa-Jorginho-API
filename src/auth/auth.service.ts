import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements IAuthService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository : Repository<UserEntity>,
        private readonly jwtService : JwtService) {}

    async singInAsync(loginDto: LoginDto): Promise<TokenDto> {
        var user = await this.userRepository.findOneBy({cpf: loginDto.cpf});

        if (!user) throw new UnauthorizedException('CPF or Password invalid!');

        var validPassword = await bcrypt.compare(loginDto.password, user.employee_password);

        if (!validPassword) throw new UnauthorizedException('CPF or Password invalid!');     
      
        var token = new TokenDto();
        token.acess_token = await this.jwtService.signAsync({cpf: user.cpf, name: user.employee_name});

        return token;
    }

}
