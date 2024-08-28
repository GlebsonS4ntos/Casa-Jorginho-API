import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateQueueDto{
    @IsNumber()
    patientId: number;

    @IsNumber()
    specialtyId: number;
}