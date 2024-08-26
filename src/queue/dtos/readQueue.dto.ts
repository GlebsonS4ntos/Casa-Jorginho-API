import { Type } from "class-transformer";
import { ReadPatientDto } from "src/patient/dtos/readPatient.dto";
import { ReadSpecialtyDto } from "src/specialty/dtos/readSpecialty.dto";

export class ReadQueueDto {
    id: number;
    queuePosition: number;
    patientId: number;
    specialtyId: number;

    @Type(() => ReadPatientDto)
    patient: ReadPatientDto;

    @Type(() => ReadSpecialtyDto)
    specialty: ReadSpecialtyDto;
}