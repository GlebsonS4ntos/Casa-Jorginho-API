import { plainToInstance } from "class-transformer";
import { CreatePatientDto } from "../dtos/createPatient.dto";
import { ReadPatientDto } from "../dtos/readPatient.dto";
import { PatientEntity } from "../entities/patient.entity";

export class PatientMapper {
    createToEntity(patientDto : CreatePatientDto) : PatientEntity {
        return plainToInstance(PatientEntity, patientDto);
    }

    entityToRead(patient : PatientEntity) : ReadPatientDto {
        return plainToInstance(ReadPatientDto, patient);
    }
}