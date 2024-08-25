import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1724521913097 implements MigrationInterface {
    name = 'CreateUser1724521913097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL, \`employee_name\` varchar(200) NOT NULL, \`employee_password\` varchar(255) NOT NULL, \`cpf\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`employee\``);
    }

}
