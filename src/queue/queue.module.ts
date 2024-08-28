import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from './entities/queue.entity';
import { QueueMapper } from './mappers/queue.mapper';
import { specialtyEntity } from 'src/specialty/entities/specialty.entity';
import { PatientEntity } from 'src/patient/entities/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueueEntity, specialtyEntity, PatientEntity])],
  controllers: [QueueController],
  providers: [{
    provide: 'IQueueService',
    useClass: QueueService
  }, QueueMapper]
})
export class QueueModule {}
