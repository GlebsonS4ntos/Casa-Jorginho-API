import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IQueueService } from './interfaces/queue.service.interface';
import { CreateQueueDto } from './dtos/createQueue.dto';
import { ReadQueueDto } from './dtos/readQueue.dto';
import { UpdateQueueDto } from './dtos/updateQueue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueEntity } from './entities/queue.entity';
import { MoreThan, Repository } from 'typeorm';
import { QueueMapper } from './mappers/queue.mapper';
import { specialtyEntity } from 'src/specialty/entities/specialty.entity';
import { PatientEntity } from 'src/patient/entities/patient.entity';

@Injectable()
export class QueueService implements IQueueService{
    constructor(
        @InjectRepository(QueueEntity) 
        private readonly queueRepository : Repository<QueueEntity>,
        private readonly queueMapper : QueueMapper,
        @InjectRepository(specialtyEntity) private readonly specialtyRepository : Repository<specialtyEntity>,
        @InjectRepository(PatientEntity) private readonly patientRepository : Repository<PatientEntity>) {}

    async addQueueAsync(queue: CreateQueueDto): Promise<ReadQueueDto> {
        var specialty = await this.specialtyRepository.findOneBy({id: queue.specialtyId}); //Verificar se a especialidade existe
        if(!specialty) throw new NotFoundException('Specialty not found');

        var patient = await this.patientRepository.findOneBy({id: queue.patientId}); //Verificar se o paciente existe
        if(!patient) throw new NotFoundException('Patient not found');
        
        var queueExist = await this.queueRepository.findOne( 
            {
                where: {
                    patientId: queue.patientId, 
                    specialtyId: queue.specialtyId,
                    queuePosition: MoreThan(0)
                }
            }); //verifica se existe uma consulta na especialidade e com o paciente em andamento

        if(queueExist) throw new BadRequestException('Queue already exists.');

        var quantityPatientInQueue = await this.queueRepository.count(
            {
                where: {
                    specialtyId: queue.specialtyId,
                    queuePosition: MoreThan(0),
                }
            }); //verifica quantas consultas existem na especialidade em andamento

        var queueEntity = this.queueMapper.createToEntity(queue);
        queueEntity.queuePosition = quantityPatientInQueue + 1; 

        var queueAdd = await this.queueRepository.save(queueEntity);

        return this.queueMapper.entityToRead(queueAdd);
    }

    async attQueueAsync(id: number, queue: UpdateQueueDto): Promise<void> {
        var specialty = await this.specialtyRepository.findOneBy({id: queue.specialtyId});
        if(!specialty) throw new NotFoundException('Specialty not found');

        if(id != queue.id) throw new BadRequestException('Id not match');

        var queueEntity = await this.queueRepository.findOne(
            {
                where: {
                    id: id
                }
            }); //Verifica se existe a queue
        
        if(!queueEntity) throw new NotFoundException('Queue not found');

        var queueExist = await this.queueRepository.findOne(
            {
                where: {
                    patientId: queueEntity.patientId, 
                    specialtyId: queue.specialtyId,
                    queuePosition: MoreThan(0),
                }
            }); //verifica se existe uma consulta na especialidade e com o paciente ja em andamento

        if(queueExist) throw new BadRequestException('Queue already exists.');

        var quantityPatientInQueue = await this.queueRepository.count(
            {
                where: {
                    specialtyId: queue.specialtyId,
                    queuePosition: MoreThan(0),
                }
            }); //verifica quantas consultas existem na especialidade em andamento
        
        var positionInOldQueue = queueEntity.queuePosition;
        var specialtyIdByOldQueue = queueEntity.specialtyId;

        console.log(typeof quantityPatientInQueue)

        queueEntity.specialtyId = queue.specialtyId;
        queueEntity.queuePosition = quantityPatientInQueue + 1; 
        await this.queueRepository.update({ id: id }, queueEntity);

        await this.queueRepository.decrement({ 
            specialtyId: specialtyIdByOldQueue, 
            queuePosition: MoreThan(positionInOldQueue)
        },'queuePosition', 1); 
        //Diminui em 1 a posição da consulta daqueles que estiverem dps
    } 

    async softDeleteQueueAsync(id: number): Promise<void> {
        var queueEntity = await this.queueRepository.findOne(
            {
                where: {
                    id: id
                }
            }); //Verifica se existe a queue
        
        if(!queueEntity) throw new NotFoundException('Queue not found');

        if(queueEntity.queuePosition === 0) throw new BadRequestException('Queue already deleted');

        var specialty = queueEntity.specialtyId;
        var position = queueEntity.queuePosition;

        await this.queueRepository.update({id: id}, {queuePosition: 0});

        await this.queueRepository.decrement({ 
            specialtyId: specialty, 
            queuePosition: MoreThan(position)
        },'queuePosition', 1); //Aumenta em 1 o posição da consulta
    }

    async getAllQueueAsync(specialtyId?: number, patientTreated?: boolean): Promise<ReadQueueDto[]>{
        var specialty = await this.specialtyRepository.findOneBy({id: specialtyId});
        if(!specialty) throw new NotFoundException('Specialty not found');

        const queryBuilder = this.queueRepository.createQueryBuilder('queue'); //Criar uma query

        queryBuilder.leftJoinAndSelect('queue.patient', 'patient'); //Retornar as info junto
        queryBuilder.leftJoinAndSelect('queue.specialty', 'specialty');

       if (patientTreated) {
            queryBuilder.andWhere('queue.queuePosition = :position', { position: 0 }); //Filtro pra retornar as consultas que ja acabaram
            queryBuilder.orderBy('queue.createdAt', 'DESC'); //Ordenar pela data de criação
        } else {
            queryBuilder.andWhere('queue.queuePosition > :position', { position: 0 });
            queryBuilder.orderBy('queue.queuePosition', 'ASC') //Ordenar pela posição
        }           

        if (typeof specialtyId !== 'undefined') { //Filtrar por especialidade
            queryBuilder.andWhere('queue.specialtyId = :specialtyId', { specialtyId });
        }

        const queues = await queryBuilder.getMany();        

        return this.queueMapper.listEntityToListRead(queues);
    }
}
