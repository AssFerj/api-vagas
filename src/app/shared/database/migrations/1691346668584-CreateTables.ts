import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1691346668584 implements MigrationInterface {
    name = 'CreateTables1691346668584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "vagas"."users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL, "enterprise_name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."jobs_applications" ("id_candidate" character varying NOT NULL, "id_job" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "success" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2fa2e4338036919f3917908cf7d" PRIMARY KEY ("id_candidate", "id_job"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."jobs" ("id" character varying NOT NULL, "description" character varying NOT NULL, "enterpriseN" character varying NOT NULL, "limit_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL, "id_recruiter" character varying NOT NULL, "max_candidate" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "vagas"."recruiters" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying(1) NOT NULL, "enterprise_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1999e5a8e68fa6c525eed22c970" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vagas"."jobs_applications" ADD CONSTRAINT "FK_4dfab5ceb8e82046d8b1835c845" FOREIGN KEY ("id_candidate") REFERENCES "vagas"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "vagas"."jobs_applications" ADD CONSTRAINT "FK_7e3c70eec94d0fc10d03a984c61" FOREIGN KEY ("id_job") REFERENCES "vagas"."jobs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vagas"."jobs_applications" DROP CONSTRAINT "FK_7e3c70eec94d0fc10d03a984c61"`);
        await queryRunner.query(`ALTER TABLE "vagas"."jobs_applications" DROP CONSTRAINT "FK_4dfab5ceb8e82046d8b1835c845"`);
        await queryRunner.query(`DROP TABLE "vagas"."recruiters"`);
        await queryRunner.query(`DROP TABLE "vagas"."jobs"`);
        await queryRunner.query(`DROP TABLE "vagas"."jobs_applications"`);
        await queryRunner.query(`DROP TABLE "vagas"."users"`);
    }

}