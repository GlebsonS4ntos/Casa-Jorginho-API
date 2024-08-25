import { QueueEntity } from 'src/queue/entities/queue.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'patient'})
export class PatientEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name : 'name', nullable : false, length : 100})
    name: string;

    @Column({name : 'birth_date', nullable : false, type : 'date'})
    birthDate: Date;

    @Column({name : 'cpf', nullable : false, length : 20})
    cpf: string;

    @Column({name : 'phone', nullable : false, length : 20})
    phone: string;

    @OneToMany(() => QueueEntity, queue => queue.patient)
    queues: QueueEntity[]
}