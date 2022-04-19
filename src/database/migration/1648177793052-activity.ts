import {MigrationInterface, QueryRunner} from "typeorm";

export class activity1648177793052 implements MigrationInterface {
    name = 'activity1648177793052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertiser" DROP CONSTRAINT "FK_1db2ee1f17edccaa0265b70adf0"`);
        await queryRunner.query(`ALTER TABLE "advertiser" ADD CONSTRAINT "UQ_1db2ee1f17edccaa0265b70adf0" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_96da49381769303a6515a8785c7" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "sentDate"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "sentDate" date`);
        await queryRunner.query(`ALTER TABLE "advertiser" ADD CONSTRAINT "UQ_1db2ee1f17edccaa0265b70adf0" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_96da49381769303a6515a8785c7" UNIQUE ("id")`);
        await queryRunner.query(`ALTER TABLE "advertiser" ADD CONSTRAINT "FK_1db2ee1f17edccaa0265b70adf0" FOREIGN KEY ("id") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_96da49381769303a6515a8785c7" FOREIGN KEY ("id") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "advertiser" DROP CONSTRAINT "FK_1db2ee1f17edccaa0265b70adf0"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "advertiser" DROP CONSTRAINT "UQ_1db2ee1f17edccaa0265b70adf0"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "sentDate"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_96da49381769303a6515a8785c7" FOREIGN KEY ("id") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertiser" DROP CONSTRAINT "UQ_1db2ee1f17edccaa0265b70adf0"`);
        await queryRunner.query(`ALTER TABLE "advertiser" ADD CONSTRAINT "FK_1db2ee1f17edccaa0265b70adf0" FOREIGN KEY ("id") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
