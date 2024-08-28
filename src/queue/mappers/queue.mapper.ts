import { plainToInstance } from "class-transformer";
import { QueueEntity } from "../entities/queue.entity";
import { ReadQueueDto } from "../dtos/readQueue.dto";
import { CreateQueueDto } from "../dtos/createQueue.dto";

export class QueueMapper {  
    entityToRead(queue : QueueEntity) : ReadQueueDto {
        return plainToInstance(ReadQueueDto, queue, { excludeExtraneousValues: true });
    }

    listEntityToListRead(queues : QueueEntity[]) : ReadQueueDto[] {
        return plainToInstance(ReadQueueDto, queues, { excludeExtraneousValues: true });
    }

    createToEntity(queueDto : CreateQueueDto) : QueueEntity {
        return plainToInstance(QueueEntity, queueDto);
    }
}