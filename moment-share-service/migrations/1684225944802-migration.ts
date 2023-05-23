import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684225944802 implements MigrationInterface {
    name = 'Migration1684225944802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "FRIEND_UNIQUE" ON "friend" ("account_1", "account_2") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."FRIEND_UNIQUE"`);
    }

}
