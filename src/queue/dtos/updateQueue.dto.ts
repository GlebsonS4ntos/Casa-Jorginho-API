import { IsNumber } from "class-validator";

export class UpdateQueueDto { 
    @IsNumber()
    id: number;

    @IsNumber()
    specialtyId: number;
}