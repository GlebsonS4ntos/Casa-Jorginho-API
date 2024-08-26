import { Module } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { SpecialtyController } from './specialty.controller';
import { SpecialtyMapper } from './mappers/specialty.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { specialtyEntity } from './entities/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([specialtyEntity])],
  providers: [SpecialtyService, SpecialtyMapper],
  controllers: [SpecialtyController]
})
export class SpecialtyModule {}
