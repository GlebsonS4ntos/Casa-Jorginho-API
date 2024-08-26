import { plainToInstance } from "class-transformer";
import { ReadSpecialtyDto } from "../dtos/readSpecialty.dto";
import { specialtyEntity } from "../entities/specialty.entity";

export class SpecialtyMapper {
    listEntityToListRead(specialty : specialtyEntity[]) : ReadSpecialtyDto[] {
        return plainToInstance(ReadSpecialtyDto, specialty);
    }
}