import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682671692135 implements MigrationInterface {
    name = 'Migration1682671692135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "moment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "author_username" character varying NOT NULL, "author_post_name" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_12b5f241c827142ad0659cb8262" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "moment"`);
    }

}
