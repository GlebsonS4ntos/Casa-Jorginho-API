import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreatePatientDto {
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsDate()
    @Type(() => Date)
    birthDate: Date;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    phone: string;
}