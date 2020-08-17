import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBaseTables1597666192692 implements MigrationInterface {
    name = 'CreateBaseTables1597666192692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offer" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "offerId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "companyName" character varying NOT NULL, "technology" character varying NOT NULL, "level" character varying NOT NULL, "employmentType" character varying NOT NULL, "cityName" character varying NOT NULL, "streetName" character varying NOT NULL, "priceMin" integer NOT NULL, "priceMax" integer NOT NULL, "currency" character varying NOT NULL, "longitude" numeric NOT NULL, "latitude" numeric NOT NULL, "mustHave" text array NOT NULL, "niceToHave" text array NOT NULL, CONSTRAINT "PK_62a0cf767cb4e012b0b4547f5ac" PRIMARY KEY ("offerId"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" character varying NOT NULL, "name" character varying NOT NULL, "contextType" character varying NOT NULL, "permissions" text array NOT NULL, CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "isEmailVerified" boolean NOT NULL DEFAULT false, "contextType" character varying NOT NULL, "roleIds" text array NOT NULL, CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("email", "username"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "offer"`);
    }

}
