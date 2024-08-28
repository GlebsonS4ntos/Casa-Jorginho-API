import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { IQueueService } from './interfaces/queue.service.interface';
import { ReadQueueDto } from './dtos/readQueue.dto';
import { UpdateQueueDto } from './dtos/updateQueue.dto';
import { CreateQueueDto } from './dtos/createQueue.dto';

@Controller('queue')
export class QueueController {
    constructor(@Inject('IQueueService') private readonly queueService : IQueueService) {}

    @Post()
    async addQueueAsync(@Body() queue : CreateQueueDto ) : Promise<ReadQueueDto> { 
        return await this.queueService.addQueueAsync(queue);
    }

    @Put(':id')
    async attQueueAsync(@Param('id') id : number, @Body() queue : UpdateQueueDto) : Promise<void> {
        return await this.queueService.attQueueAsync(id, queue);
    }

    @Delete(':id')
    async softDeleteQueueAsync(@Param('id') id : number) : Promise<void> {
        return await this.queueService.softDeleteQueueAsync(id);
    }

    @Get()
    async getAllQueueAsync(@Query('specialtyId') specialtyId ?: string, @Query('patientTreated') patientTreated ?: string) : Promise<ReadQueueDto[]> {
        var parsedSpecialtyId = specialtyId ? Number(specialtyId) : undefined;
        var parsedPatientTreated = patientTreated ? (patientTreated.toLowerCase() === 'true' ? true : false) : false;

        return await this.queueService.getAllQueueAsync(parsedSpecialtyId, parsedPatientTreated);
    }
}
