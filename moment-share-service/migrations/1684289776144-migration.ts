import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684289776144 implements MigrationInterface {
    name = 'Migration1684289776144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_e728a72171f4848b76e50622bb9"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_f06e34411f32c8ee872e2761fb6"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_0a6c184295644b2e13e83e9c97c"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_24d4834535b790db8d6390c8f4a"`);
        await queryRunner.query(`DROP INDEX "public"."FRIEND_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1_character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2_character"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "hasUnread" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "user_account" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "user_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "friend_account" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "friend_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_200d0ba9a6a60f492afcc47f5fd" FOREIGN KEY ("user_account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_8c9d935fc14f22bf9016eaeb6c7" FOREIGN KEY ("user_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_2f5791faddb984d04c4106baef1" FOREIGN KEY ("friend_account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_a64e17ada5153ff9a4e1a46cbc5" FOREIGN KEY ("friend_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_a64e17ada5153ff9a4e1a46cbc5"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_2f5791faddb984d04c4106baef1"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_8c9d935fc14f22bf9016eaeb6c7"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_200d0ba9a6a60f492afcc47f5fd"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "friend_character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "friend_account"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "user_character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "user_account"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "hasUnread"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1" integer`);
        await queryRunner.query(`CREATE UNIQUE INDEX "FRIEND_UNIQUE" ON "friend" ("account_1", "account_2") `);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_24d4834535b790db8d6390c8f4a" FOREIGN KEY ("account_2_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_0a6c184295644b2e13e83e9c97c" FOREIGN KEY ("account_1_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_f06e34411f32c8ee872e2761fb6" FOREIGN KEY ("account_2") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_e728a72171f4848b76e50622bb9" FOREIGN KEY ("account_1") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
