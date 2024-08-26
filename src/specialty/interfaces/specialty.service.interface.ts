import { ReadSpecialtyDto } from "../dtos/readSpecialty.dto";

export interface ISpecialtyService {
    getAllSpecialtyAsync() : Promise<ReadSpecialtyDto[]> 
}