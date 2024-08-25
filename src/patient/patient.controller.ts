import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePatientDto } from './dtos/createPatient.dto';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService : PatientService){}

    @Post()
    async addPatientAsync(@Body() patient : CreatePatientDto ){
        return this.patientService.createPatientAsync(patient);
    }

    @Get(':cpf')
    async getPatientByCpfAsync(@Param('cpf') cpf : string ){
        return this.patientService.getPatientByCpfAsync(cpf);
    }
}
