import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684992511482 implements MigrationInterface {
    name = 'Migration1684992511482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REPORT_UNIQUE" ON "report" ("momentId", "reporterId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."REPORT_UNIQUE"`);
    }

}
