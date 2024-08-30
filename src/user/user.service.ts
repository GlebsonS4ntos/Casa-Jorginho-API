import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserService } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements IUserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository : Repository<UserEntity>) {}

    async getUserByCpfAsync(cpf : string) : Promise<void> {
        const user= await this.userRepository.findOne({
            where : {
                cpf : cpf
        }});

        if (!user) throw new NotFoundException('User not found');
    }

}
