import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRES, algorithm: 'HS256' },
  })],
  providers: [{
    provide: 'IAuthService',
    useClass: AuthService
  }, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
