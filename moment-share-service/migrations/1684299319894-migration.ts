import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684299319894 implements MigrationInterface {
    name = 'Migration1684299319894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."USER_LIKE_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "username" TO "account"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "account" integer`);
        await queryRunner.query(`CREATE UNIQUE INDEX "USER_LIKE_UNIQUE" ON "like" ("account", "moment_id") `);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0" FOREIGN KEY ("account") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0"`);
        await queryRunner.query(`DROP INDEX "public"."USER_LIKE_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "like" DROP COLUMN "account"`);
        await queryRunner.query(`ALTER TABLE "like" ADD "account" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "account" TO "username"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "USER_LIKE_UNIQUE" ON "like" ("username", "moment_id") `);
    }

}
