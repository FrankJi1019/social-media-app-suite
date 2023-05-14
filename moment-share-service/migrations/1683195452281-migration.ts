import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683195452281 implements MigrationInterface {
    name = 'Migration1683195452281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "author_username"`);
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "author_post_name"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "character" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "character"`);
        await queryRunner.query(`ALTER TABLE "moment" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "author_post_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moment" ADD "author_username" character varying NOT NULL`);
    }

}
