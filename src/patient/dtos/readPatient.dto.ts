import { Expose, Type } from "class-transformer";
import { ReadQueueDto } from "src/queue/dtos/readQueue.dto";

export class ReadPatientDto {
    @Expose()
    id : number;

    @Expose()
    name : string;

    @Expose()
    birthDate : Date;

    @Expose()
    cpf : string;

    @Expose()
    phone : string;

    @Type(() => ReadQueueDto)
    @Expose()
    queues : ReadQueueDto[]
}