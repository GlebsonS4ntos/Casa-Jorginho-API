import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQueue1724555595605 implements MigrationInterface {
    name = 'CreateQueue1724555595605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`queue\` (\`id\` int NOT NULL, \`queue_position\` int NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`patient_id\` int NOT NULL, \`specialty_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_9ab4360fe0076a63532b6ac0b2c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_4cd04648d3e1cbc94e6c3043569\` FOREIGN KEY (\`specialty_id\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_4cd04648d3e1cbc94e6c3043569\``);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_9ab4360fe0076a63532b6ac0b2c\``);
        await queryRunner.query(`DROP TABLE \`queue\``);
    }

}
