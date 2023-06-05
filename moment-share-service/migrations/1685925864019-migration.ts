import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685925864019 implements MigrationInterface {
    name = 'Migration1685925864019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment-image" DROP CONSTRAINT "FK_c21f42c1792f25daf46484e5364"`);
        await queryRunner.query(`ALTER TABLE "moment-image" ADD CONSTRAINT "FK_c21f42c1792f25daf46484e5364" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "moment-image" DROP CONSTRAINT "FK_c21f42c1792f25daf46484e5364"`);
        await queryRunner.query(`ALTER TABLE "moment-image" ADD CONSTRAINT "FK_c21f42c1792f25daf46484e5364" FOREIGN KEY ("moment") REFERENCES "moment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
