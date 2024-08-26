import { Injectable } from '@nestjs/common';
import { specialtyEntity } from './entities/specialty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISpecialtyService } from './interfaces/specialty.service.interface';
import { ReadSpecialtyDto } from './dtos/readSpecialty.dto';
import { SpecialtyMapper } from './mappers/specialty.mapper';

@Injectable()
export class SpecialtyService  implements ISpecialtyService {
    constructor(
        @InjectRepository(specialtyEntity) 
        private readonly specialtyRepository : Repository<specialtyEntity>,
        private readonly specialtyMapper : SpecialtyMapper) {}

    async getAllSpecialtyAsync(): Promise<ReadSpecialtyDto[]> {
        var specialties = await this.specialtyRepository.find();
        return this.specialtyMapper.listEntityToListRead(specialties);
    }
}
