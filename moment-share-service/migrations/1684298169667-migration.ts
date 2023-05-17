import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684298169667 implements MigrationInterface {
    name = 'Migration1684298169667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP CONSTRAINT "FK_f144beefa4f7d148c076a1591d6"`);
        await queryRunner.query(`ALTER TABLE "moment" RENAME COLUMN "accountId" TO "account"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD CONSTRAINT "FK_c142b67f4100e390cb499c1d99d" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP CONSTRAINT "FK_c142b67f4100e390cb499c1d99d"`);
        await queryRunner.query(`ALTER TABLE "moment" RENAME COLUMN "account" TO "accountId"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD CONSTRAINT "FK_f144beefa4f7d148c076a1591d6" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
