import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseTables1597680913255 implements MigrationInterface {
    name = 'BaseTables1597680913255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offers" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "offer_id" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "company_name" character varying NOT NULL, "technology" character varying NOT NULL, "level" character varying NOT NULL, "employment_type" character varying NOT NULL, "city_name" character varying NOT NULL, "street_name" character varying NOT NULL, "price_min" integer NOT NULL, "price_max" integer NOT NULL, "currency" character varying NOT NULL, "longitude" numeric NOT NULL, "latitude" numeric NOT NULL, "must_have" text array NOT NULL, "nice_to_have" text array NOT NULL, CONSTRAINT "PK_d611e618dbf3754ffb7fc1ffb38" PRIMARY KEY ("offer_id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "role_id" character varying NOT NULL, "name" character varying NOT NULL, "context_type" character varying NOT NULL, "permissions" text array NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "is_deleted" boolean NOT NULL DEFAULT false, "is_email_verified" boolean NOT NULL DEFAULT false, "context_type" character varying NOT NULL, "role_ids" text array NOT NULL, CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("email", "username"), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "offers"`);
    }

}
