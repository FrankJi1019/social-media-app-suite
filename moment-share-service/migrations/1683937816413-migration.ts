import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683937816413 implements MigrationInterface {
    name = 'Migration1683937816413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "moment_tags" ("moment_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_e677facec32e6030576c8f8689f" PRIMARY KEY ("moment_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d4f022fff947d1417229f4f672" ON "moment_tags" ("moment_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_60ded66c6c9599b9090b021836" ON "moment_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "moment_tags" ADD CONSTRAINT "FK_d4f022fff947d1417229f4f672c" FOREIGN KEY ("moment_id") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "moment_tags" ADD CONSTRAINT "FK_60ded66c6c9599b9090b0218364" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment_tags" DROP CONSTRAINT "FK_60ded66c6c9599b9090b0218364"`);
        await queryRunner.query(`ALTER TABLE "moment_tags" DROP CONSTRAINT "FK_d4f022fff947d1417229f4f672c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_60ded66c6c9599b9090b021836"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4f022fff947d1417229f4f672"`);
        await queryRunner.query(`DROP TABLE "moment_tags"`);
    }

}
