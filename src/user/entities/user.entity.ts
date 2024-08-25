import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name : 'employee'})
export class UserEntity{
    @PrimaryGeneratedColumn()	
    id: number;

    @Column({name : 'employee_name', nullable : false, length : 200})
    employee_name: string;

    @Column({name : 'employee_password', nullable : false})
    employee_password: string;

    @Column({name : 'cpf', nullable : false, length : 20})
    cpf: string;
}
