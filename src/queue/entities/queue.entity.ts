import { PatientEntity } from "src/patient/entities/patient.entity";
import { specialtyEntity } from "src/specialty/entities/specialty.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Entity('queue')
export class QueueEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name : 'queue_position', nullable : false, type : 'int' })
    queuePosition: number;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name : 'patient_id', nullable : false, type : 'int' })
    patientId: number;

    @Column({ name : 'specialty_id', nullable : false, type : 'int' })
    specialtyId: number;

    @ManyToOne(() => PatientEntity, patient => patient.queues)
    @JoinColumn({ name : 'patient_id', referencedColumnName : 'id' })
    patient: PatientEntity;
    
    @ManyToOne(() => specialtyEntity, specialty => specialty.queues)
    @JoinColumn({ name : 'specialty_id', referencedColumnName : 'id' })
    specialty: specialtyEntity;
}