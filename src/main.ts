import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configura o ValidationPipe globalmente
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão nos DTOs
    forbidNonWhitelisted: true, // Retorna erro para propriedades não permitidas
    transform: true, // Transforma os dados de entrada para o tipo do DTO
  }));

  await app.listen(3000);
}
bootstrap();
