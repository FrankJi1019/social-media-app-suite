import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684297874904 implements MigrationInterface {
    name = 'Migration1684297874904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" RENAME COLUMN "username" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "moment" ADD CONSTRAINT "FK_f144beefa4f7d148c076a1591d6" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP CONSTRAINT "FK_f144beefa4f7d148c076a1591d6"`);
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moment" RENAME COLUMN "accountId" TO "username"`);
    }

}
