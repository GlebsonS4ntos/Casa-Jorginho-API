import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { IsCPF } from "src/shared/validators/cpf.validator";

export class CreatePatientDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @IsNotEmpty()
    @IsCPF() 
    cpf: string;

    @IsNotEmpty()
    phone: string;
}