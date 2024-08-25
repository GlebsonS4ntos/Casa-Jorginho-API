import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPrimaryKeys1724617277963 implements MigrationInterface {
    name = 'FixPrimaryKeys1724617277963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_9ab4360fe0076a63532b6ac0b2c\``);
        await queryRunner.query(`ALTER TABLE \`patient\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`patient\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`patient\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_4cd04648d3e1cbc94e6c3043569\``);
        await queryRunner.query(`ALTER TABLE \`specialty\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`specialty\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`specialty\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`queue\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_9ab4360fe0076a63532b6ac0b2c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_4cd04648d3e1cbc94e6c3043569\` FOREIGN KEY (\`specialty_id\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_4cd04648d3e1cbc94e6c3043569\``);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_9ab4360fe0076a63532b6ac0b2c\``);
        await queryRunner.query(`ALTER TABLE \`queue\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`queue\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`specialty\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`specialty\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`specialty\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_4cd04648d3e1cbc94e6c3043569\` FOREIGN KEY (\`specialty_id\`) REFERENCES \`specialty\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patient\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`patient\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`patient\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_9ab4360fe0076a63532b6ac0b2c\` FOREIGN KEY (\`patient_id\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD PRIMARY KEY (\`id\`)`);
    }

}
