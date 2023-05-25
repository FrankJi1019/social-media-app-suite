import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684920294809 implements MigrationInterface {
    name = 'Migration1684920294809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "report" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "reason" character varying NOT NULL, "momentId" integer, "reporterId" integer, CONSTRAINT "PK_99e4d0bea58cba73c57f935a546" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_19dd7b217e942150d2e133b0371" FOREIGN KEY ("momentId") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_253163ca85b927f62596606f6cc" FOREIGN KEY ("reporterId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_253163ca85b927f62596606f6cc"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_19dd7b217e942150d2e133b0371"`);
        await queryRunner.query(`DROP TABLE "report"`);
    }

}
