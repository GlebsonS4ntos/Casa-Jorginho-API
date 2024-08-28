import { CreateQueueDto } from "../dtos/createQueue.dto";
import { ReadQueueDto } from "../dtos/readQueue.dto";
import { UpdateQueueDto } from "../dtos/updateQueue.dto";

export interface IQueueService {
    addQueueAsync(queue : CreateQueueDto) : Promise<ReadQueueDto>;
    attQueueAsync(id : number, queue : UpdateQueueDto) : Promise<void>;
    getAllQueueAsync(specialtyId ?: number, patientTreated ?: boolean) : Promise<ReadQueueDto[]>;
    softDeleteQueueAsync(id : number) : Promise<void>;
}