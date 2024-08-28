import { Expose, Type } from "class-transformer";
import { ReadPatientDto } from "src/patient/dtos/readPatient.dto";
import { ReadSpecialtyDto } from "src/specialty/dtos/readSpecialty.dto";

export class ReadQueueDto {
    @Expose()
    id: number;

    @Expose()
    queuePosition: number;
    
    @Expose()
    patientId: number;
    
    @Expose()
    specialtyId: number;

    @Type(() => ReadPatientDto)
    @Expose()
    patient: ReadPatientDto;

    @Type(() => ReadSpecialtyDto)
    @Expose()
    specialty: ReadSpecialtyDto;
}