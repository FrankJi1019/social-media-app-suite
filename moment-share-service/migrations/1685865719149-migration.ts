import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685865719149 implements MigrationInterface {
    name = 'Migration1685865719149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_253163ca85b927f62596606f6cc"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_19dd7b217e942150d2e133b0371"`);
        await queryRunner.query(`CREATE TABLE "moment-image" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "order" integer NOT NULL, "link" character varying NOT NULL, "moment" integer, CONSTRAINT "PK_5f73c47e2bb3e52ff498387d6b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "momentId"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "reporterId"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "moment" integer`);
        await queryRunner.query(`ALTER TABLE "report" ADD "reporter-account" integer`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_f0288543c6ff6f318bd0c7832a6" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_9b3ec645cbe089ecfd790036897" FOREIGN KEY ("reporter-account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "moment-image" ADD CONSTRAINT "FK_c21f42c1792f25daf46484e5364" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment-image" DROP CONSTRAINT "FK_c21f42c1792f25daf46484e5364"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_9b3ec645cbe089ecfd790036897"`);
        await queryRunner.query(`ALTER TABLE "report" DROP CONSTRAINT "FK_f0288543c6ff6f318bd0c7832a6"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "reporter-account"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "moment"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "reporterId" integer`);
        await queryRunner.query(`ALTER TABLE "report" ADD "momentId" integer`);
        await queryRunner.query(`DROP TABLE "moment-image"`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_19dd7b217e942150d2e133b0371" FOREIGN KEY ("momentId") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "report" ADD CONSTRAINT "FK_253163ca85b927f62596606f6cc" FOREIGN KEY ("reporterId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
