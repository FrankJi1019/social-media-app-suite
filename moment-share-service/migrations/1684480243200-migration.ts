import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684480243200 implements MigrationInterface {
    name = 'Migration1684480243200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "sender" integer, "receiver" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_230c5e4ab959103dc176e7d86a7" FOREIGN KEY ("sender") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_669cdf84315ad611a51618c0470" FOREIGN KEY ("receiver") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_669cdf84315ad611a51618c0470"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_230c5e4ab959103dc176e7d86a7"`);
        await queryRunner.query(`DROP TABLE "chat"`);
    }

}
