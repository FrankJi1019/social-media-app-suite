import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683588329741 implements MigrationInterface {
    name = 'Migration1683588329741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "USER_LIKE_UNIQUE" ON "like" ("username", "moment_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."USER_LIKE_UNIQUE"`);
    }

}
