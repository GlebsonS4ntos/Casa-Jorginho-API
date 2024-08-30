import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';

@Controller('user')
export class UserController {

  constructor(@Inject('IUserService')private readonly userService : IUserService) {}

  @Get(':cpf')
  async getUserByCpf(@Param('cpf') cpf : string) {
    return await this.userService.getUserByCpfAsync(cpf);
  }
}
