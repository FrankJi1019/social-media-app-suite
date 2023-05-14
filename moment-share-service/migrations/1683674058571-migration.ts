import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683674058571 implements MigrationInterface {
    name = 'Migration1683674058571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "content" character varying NOT NULL, "moment" integer, "character" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_89cd4699f8668b8c7589a901121" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_22e9a983e9ee9bc8bc75544bfaa" FOREIGN KEY ("character") REFERENCES "character"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_22e9a983e9ee9bc8bc75544bfaa"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_89cd4699f8668b8c7589a901121"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
