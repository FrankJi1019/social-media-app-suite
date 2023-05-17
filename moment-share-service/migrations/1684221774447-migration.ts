import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684221774447 implements MigrationInterface {
    name = 'Migration1684221774447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_5f81cc16d5c8374bfa53d5ab5bc"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_9b3b2dda14bbca0071128435d08"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_5c030519f71fde428cb6eb8ddbb"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_b2b385b9df0b44bd4ae81dae5ce"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account1Id"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account2Id"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account1CharacterId"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account2CharacterId"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1_Character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2_Character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_e728a72171f4848b76e50622bb9" FOREIGN KEY ("account_1") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_f06e34411f32c8ee872e2761fb6" FOREIGN KEY ("account_2") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_e6559b24a241e0107f190c1456c" FOREIGN KEY ("account_1_Character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_4bb485546fcdc0bef5086e9cd85" FOREIGN KEY ("account_2_Character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_4bb485546fcdc0bef5086e9cd85"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_e6559b24a241e0107f190c1456c"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_f06e34411f32c8ee872e2761fb6"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_e728a72171f4848b76e50622bb9"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2_Character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1_Character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account2CharacterId" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account1CharacterId" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account2Id" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account1Id" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_b2b385b9df0b44bd4ae81dae5ce" FOREIGN KEY ("account2CharacterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_5c030519f71fde428cb6eb8ddbb" FOREIGN KEY ("account1CharacterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_9b3b2dda14bbca0071128435d08" FOREIGN KEY ("account2Id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_5f81cc16d5c8374bfa53d5ab5bc" FOREIGN KEY ("account1Id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
