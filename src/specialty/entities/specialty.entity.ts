import { QueueEntity } from "src/queue/entities/queue.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm"

@Entity({ name: 'specialty'})
export class specialtyEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number

    @Column({name: 'name', nullable: false})
    name: string

    @OneToMany(() => QueueEntity, queue => queue.specialty)
    queues: QueueEntity[]
}