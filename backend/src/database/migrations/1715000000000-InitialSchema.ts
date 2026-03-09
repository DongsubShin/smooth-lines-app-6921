import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1715000000000 implements MigrationInterface {
    name = 'InitialSchema1715000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Enums
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'barber', 'client')`);
        await queryRunner.query(`CREATE TYPE "bookings_status_enum" AS ENUM('pending', 'confirmed', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TYPE "notifications_type_enum" AS ENUM('reminder', 'confirmation', 'cancellation')`);
        await queryRunner.query(`CREATE TYPE "notifications_status_enum" AS ENUM('pending', 'sent', 'failed')`);

        // Create Tables
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'client', CONSTRAINT "UQ_97672df88af87152aed6272e65a" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672df88af87152aed6272e65" ON "users" ("email") `);
        
        await queryRunner.query(`CREATE TABLE "barbers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid NOT NULL, "specialties" text NOT NULL DEFAULT '{}', "working_hours" jsonb, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "REL_78912345678912345678912345" UNIQUE ("user_id"), CONSTRAINT "PK_barbers_id" PRIMARY KEY ("id"))`);
        
        await queryRunner.query(`CREATE TABLE "clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, "phone" character varying, "visit_count" integer NOT NULL DEFAULT 0, "notes" text, CONSTRAINT "REL_client_user" UNIQUE ("user_id"), CONSTRAINT "PK_clients_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_clients_phone" ON "clients" ("phone") `);

        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "duration_minutes" integer NOT NULL, "price" numeric(10,2) NOT NULL, "category" character varying NOT NULL, CONSTRAINT "PK_services_id" PRIMARY KEY ("id"))`);

        await queryRunner.query(`CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "barber_id" uuid NOT NULL, "client_id" uuid NOT NULL, "service_id" uuid NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "status" "bookings_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "PK_bookings_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bookings_scheduled_at" ON "bookings" ("scheduled_at") `);

        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "client_id" uuid NOT NULL, "type" "notifications_type_enum" NOT NULL, "scheduled_at" TIMESTAMP NOT NULL, "sent_at" TIMESTAMP, "status" "notifications_status_enum" NOT NULL DEFAULT 'pending', "errorMessage" text, CONSTRAINT "PK_notifications_id" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_notifications_scheduled_at" ON "notifications" ("scheduled_at") `);

        // Foreign Keys
        await queryRunner.query(`ALTER TABLE "barbers" ADD CONSTRAINT "FK_barbers_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_clients_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_barber" FOREIGN KEY ("barber_id") REFERENCES "barbers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_bookings_service" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notifications" ADD CONSTRAINT "FK_notifications_client" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notifications" DROP CONSTRAINT "FK_notifications_client"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_bookings_service"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_bookings_client"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_bookings_barber"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_clients_user"`);
        await queryRunner.query(`ALTER TABLE "barbers" DROP CONSTRAINT "FK_barbers_user"`);
        
        await queryRunner.query(`DROP TABLE "notifications"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "barbers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        
        await queryRunner.query(`DROP TYPE "notifications_status_enum"`);
        await queryRunner.query(`DROP TYPE "notifications_type_enum"`);
        await queryRunner.query(`DROP TYPE "bookings_status_enum"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}