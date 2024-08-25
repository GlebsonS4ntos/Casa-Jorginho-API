import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSpecialty1724551098351 implements MigrationInterface {
    name = 'CreateSpecialty1724551098351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`specialty\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`specialty\``);
    }

}
