import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684221539753 implements MigrationInterface {
    name = 'Migration1684221539753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "friend" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "account1Id" integer, "account2Id" integer, "account1CharacterId" integer, "account2CharacterId" integer, CONSTRAINT "PK_1b301ac8ac5fcee876db96069b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_5f81cc16d5c8374bfa53d5ab5bc" FOREIGN KEY ("account1Id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_9b3b2dda14bbca0071128435d08" FOREIGN KEY ("account2Id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_5c030519f71fde428cb6eb8ddbb" FOREIGN KEY ("account1CharacterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend" ADD CONSTRAINT "FK_b2b385b9df0b44bd4ae81dae5ce" FOREIGN KEY ("account2CharacterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_b2b385b9df0b44bd4ae81dae5ce"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_5c030519f71fde428cb6eb8ddbb"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_9b3b2dda14bbca0071128435d08"`);
        await queryRunner.query(`ALTER TABLE "friend" DROP CONSTRAINT "FK_5f81cc16d5c8374bfa53d5ab5bc"`);
        await queryRunner.query(`DROP TABLE "friend"`);
    }

}
