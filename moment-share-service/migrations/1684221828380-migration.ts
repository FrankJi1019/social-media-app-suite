import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684221828380 implements MigrationInterface {
    name = 'Migration1684221828380'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_e6559b24a241e0107f190c1456c"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_4bb485546fcdc0bef5086e9cd85"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1_Character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2_Character"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2_character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_0a6c184295644b2e13e83e9c97c" FOREIGN KEY ("account_1_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_24d4834535b790db8d6390c8f4a" FOREIGN KEY ("account_2_character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_24d4834535b790db8d6390c8f4a"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_0a6c184295644b2e13e83e9c97c"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_2_character"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP COLUMN "account_1_character"`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_2_Character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD "account_1_Character" integer`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_4bb485546fcdc0bef5086e9cd85" FOREIGN KEY ("account_2_Character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_e6559b24a241e0107f190c1456c" FOREIGN KEY ("account_1_Character") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
