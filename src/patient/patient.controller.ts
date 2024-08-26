import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreatePatientDto } from './dtos/createPatient.dto';
import { IPatientService } from './interfaces/patient.service.interface';

@Controller('patient')
export class PatientController {
    constructor(@Inject('IPatientService') private readonly patientService : IPatientService){}

    @Post()
    async addPatientAsync(@Body() patient : CreatePatientDto ){
        return await this.patientService.createPatientAsync(patient);
    }

    @Get(':cpf')
    async getPatientByCpfAsync(@Param('cpf') cpf : string ){
        return await this.patientService.getPatientByCpfAsync(cpf);
    }
}
