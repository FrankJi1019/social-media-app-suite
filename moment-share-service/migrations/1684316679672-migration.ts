import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684316679672 implements MigrationInterface {
    name = 'Migration1684316679672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "FRIEND_UNIQUE" ON "friend" ("user_account", "friend_account") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."FRIEND_UNIQUE"`);
    }

}
