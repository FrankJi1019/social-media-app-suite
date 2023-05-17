import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684312368732 implements MigrationInterface {
    name = 'Migration1684312368732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_17abc9f9b556f528e3f308070f4"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0"`);
        await queryRunner.query(`DROP INDEX "public"."USER_LIKE_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "moment_id" TO "moment"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "USER_LIKE_UNIQUE" ON "like" ("account", "moment") `);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0" FOREIGN KEY ("account") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_9e7c4e4cef61129cda04b03d038" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_9e7c4e4cef61129cda04b03d038"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0"`);
        await queryRunner.query(`DROP INDEX "public"."USER_LIKE_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "like" RENAME COLUMN "moment" TO "moment_id"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "USER_LIKE_UNIQUE" ON "like" ("moment_id", "account") `);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_ee6583a8c308146293ad8b57cf0" FOREIGN KEY ("account") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_17abc9f9b556f528e3f308070f4" FOREIGN KEY ("moment_id") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
