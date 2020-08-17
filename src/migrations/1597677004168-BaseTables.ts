import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseTables1597677004168 implements MigrationInterface {
    name = 'BaseTables1597677004168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "offerId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "companyName" character varying NOT NULL, "technology" character varying NOT NULL, "level" character varying NOT NULL, "employmentType" character varying NOT NULL, "cityName" character varying NOT NULL, "streetName" character varying NOT NULL, "priceMin" integer NOT NULL, "priceMax" integer NOT NULL, "currency" character varying NOT NULL, "longitude" numeric NOT NULL, "latitude" numeric NOT NULL, "mustHave" text array NOT NULL, "niceToHave" text array NOT NULL, CONSTRAINT "PK_7016eccf0b5dc977f248f1841f6" PRIMARY KEY ("offerId"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" character varying NOT NULL, "name" character varying NOT NULL, "contextType" character varying NOT NULL, "permissions" text array NOT NULL, CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "isDeleted" boolean NOT NULL DEFAULT false, "isEmailVerified" boolean NOT NULL DEFAULT false, "contextType" character varying NOT NULL, "roleIds" text array NOT NULL, CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("email", "username"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "offers"`);
    }

}
