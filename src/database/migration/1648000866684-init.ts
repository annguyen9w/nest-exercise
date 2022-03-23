import {MigrationInterface, QueryRunner} from "typeorm";

export class init1648000866684 implements MigrationInterface {
    name = 'init1648000866684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationAccountName" text NOT NULL, "creationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationAccountName" text, "modificationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationTimestamp" TIMESTAMP NOT NULL DEFAULT 'now()', "callNumber" integer, "category" text, "credits_HD" integer, "credits_RADIO" integer, "credits_SD" integer, "customCalendar" integer, "data" text, "dataNumber" integer, "department" text, "entityType" text, "id_Advertisor" uuid, "id_Client" uuid, "id_ContactMethod_primary" uuid, "ID_CURRENTITEM" uuid, "id_Entity_customer" uuid, "id_Location_primary" uuid, "isActive" smallint, "isInactive" smallint, "isPrimary" smallint, "market" text, "nameFirst" text, "nameFull" text, "nameLast" text, "nameSalutation" text, "notes" text, "region" text, "source" text, "state" text, "status" text, "terms" text, "title" text, "type" text, "url" text, CONSTRAINT "PK_50a7741b415bc585fcf9c984332" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationAccountName" text NOT NULL, "creationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationAccountName" text, "modificationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationTimestamp" TIMESTAMP NOT NULL DEFAULT 'now()', "date" TIMESTAMP, "email" text, "id_Entity_person" uuid, "id_User" uuid, "message" text, "name" text, "sentDate" TIMESTAMP, "sentTime" TIME, "status" text, "subject" text, "time" TIME, "type" text, "id_Entity" uuid, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clientNumber" integer, "entityType" text, CONSTRAINT "REL_96da49381769303a6515a8785c" UNIQUE ("id"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contact_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationAccountName" text NOT NULL, "creationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationAccountName" text, "modificationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationTimestamp" TIMESTAMP NOT NULL DEFAULT 'now()', "type" text, "value" text, "id_Entity" uuid, CONSTRAINT "PK_ee65af2b1bc0c820a934549b8ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationAccountName" text NOT NULL, "creationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationAccountName" text, "modificationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationTimestamp" TIMESTAMP NOT NULL DEFAULT 'now()', "fileName" text, "title" text, "type" text, "id_Entity" uuid, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creationAccountName" text NOT NULL, "creationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationAccountName" text, "modificationHostTimestamp" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 'now()', "modificationTimestamp" TIMESTAMP NOT NULL DEFAULT 'now()', "addressLine1" text, "addressLine2" text, "attn" text, "city" text, "country" character varying(100), "id_ContactMethod" text, "name" text, "state" character varying(100), "zipCode" character varying(20), "id_Entity" uuid, CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_98ca41b3b964244a5f7ad099d75" FOREIGN KEY ("id_Entity") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_96da49381769303a6515a8785c7" FOREIGN KEY ("id") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contact_method" ADD CONSTRAINT "FK_acd393b4a1738a51a4961d90131" FOREIGN KEY ("id_Entity") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_160748c47c95f6f9f6bcb73978b" FOREIGN KEY ("id_Entity") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "location" ADD CONSTRAINT "FK_a5bcc48a3085197388861f36e32" FOREIGN KEY ("id_Entity") REFERENCES "entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "location" DROP CONSTRAINT "FK_a5bcc48a3085197388861f36e32"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_160748c47c95f6f9f6bcb73978b"`);
        await queryRunner.query(`ALTER TABLE "contact_method" DROP CONSTRAINT "FK_acd393b4a1738a51a4961d90131"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_96da49381769303a6515a8785c7"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_98ca41b3b964244a5f7ad099d75"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "contact_method"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "entity"`);
    }

}
