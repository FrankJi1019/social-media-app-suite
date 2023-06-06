import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686002475081 implements MigrationInterface {
    name = 'Migration1686002475081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "profileS3ObjectKey" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN "profileS3ObjectKey"`);
    }

}
