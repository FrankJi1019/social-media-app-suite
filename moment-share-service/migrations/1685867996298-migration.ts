import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685867996298 implements MigrationInterface {
    name = 'Migration1685867996298'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment-image" DROP COLUMN "link"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment-image" ADD "link" character varying NOT NULL`);
    }

}
