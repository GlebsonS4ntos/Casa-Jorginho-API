import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.development.local'] }),
    TypeOrmModule.forRoot(AppDataSource.options), 
    UserModule, 
    PatientModule, QueueModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
