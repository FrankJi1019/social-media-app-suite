import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683530782439 implements MigrationInterface {
    name = 'Migration1683530782439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "like" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "moment_id" integer, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_17abc9f9b556f528e3f308070f4" FOREIGN KEY ("moment_id") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_17abc9f9b556f528e3f308070f4"`);
        await queryRunner.query(`DROP TABLE "like"`);
    }

}
