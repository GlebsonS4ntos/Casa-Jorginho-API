import { CreatePatientDto } from "../dtos/createPatient.dto";
import { ReadPatientDto } from "../dtos/readPatient.dto";

export interface IPatientService {
    createPatientAsync(patientDto : CreatePatientDto): Promise<ReadPatientDto>; 
    getPatientByCpfAsync(cpf : string) : Promise<ReadPatientDto>;
}