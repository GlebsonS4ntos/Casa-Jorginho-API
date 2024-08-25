import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePatient1724527905488 implements MigrationInterface {
    name = 'CreatePatient1724527905488'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`patient\` (\`id\` int NOT NULL, \`name\` varchar(100) NOT NULL, \`birth_date\` date NOT NULL, \`cpf\` varchar(20) NOT NULL, \`phone\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`patient\``);
    }

}
