import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684312960940 implements MigrationInterface {
    name = 'Migration1684312960940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "username" TO "account"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "account" integer`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_3e4182ec2563d311aa48edf723a" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_3e4182ec2563d311aa48edf723a"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "account" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "account" TO "username"`);
    }

}
