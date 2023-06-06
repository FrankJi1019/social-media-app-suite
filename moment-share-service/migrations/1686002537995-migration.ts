import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1686002537995 implements MigrationInterface {
    name = 'Migration1686002537995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "profileS3ObjectKey" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "profileS3ObjectKey" SET DEFAULT ''`);
    }

}
