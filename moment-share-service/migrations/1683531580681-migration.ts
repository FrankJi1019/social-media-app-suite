import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683531580681 implements MigrationInterface {
    name = 'Migration1683531580681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "character" integer`);
        await queryRunner.query(`ALTER TABLE "moment" ADD CONSTRAINT "FK_d2ed66e3a8c46f1465b1d4933df" FOREIGN KEY ("character") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP CONSTRAINT "FK_d2ed66e3a8c46f1465b1d4933df"`);
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "character" character varying NOT NULL`);
    }

}
