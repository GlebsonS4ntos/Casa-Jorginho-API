import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dtos/createPatient.dto';
import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPatientService } from './interfaces/patient.service.interface';
import { ReadPatientDto } from './dtos/readPatient.dto';
import { PatientMapper } from './mappers/patient.mapper';

@Injectable()
export class PatientService implements IPatientService {

    constructor(
        @InjectRepository(PatientEntity) 
        private readonly patientRepository : Repository<PatientEntity>,
        private readonly patientMapper : PatientMapper) {}

    async getPatientByCpfAsync(cpf: string): Promise<ReadPatientDto> {
        var patient = await this.patientRepository.findOne({
            where: { cpf: cpf }, 
            relations: ['queues'],
        });

        if (!patient) throw new NotFoundException('Patient not found');
        
        return this.patientMapper.entityToRead(patient);
    }

    async createPatientAsync(patientDto : CreatePatientDto) : Promise<ReadPatientDto> {
        var patient = await this.patientRepository.save(this.patientMapper.createToEntity(patientDto));

        return this.patientMapper.entityToRead(patient);
    }
    
}
