import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IAuthService } from './interfaces/auth.service.interface';
import { LoginDto } from './dtos/login.dto';
import { TokenDto } from './dtos/token.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('IAuthService') private readonly authService : IAuthService) {}

    @Post()
    async singInAsync(@Body() loginDto : LoginDto) : Promise<TokenDto> {
        return await this.authService.singInAsync(loginDto);
    }
}
