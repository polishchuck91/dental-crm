import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMakeCRMDatabase1736019502130 implements MigrationInterface {
    name = 'InitMakeCRMDatabase1736019502130'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`staff\` (\`staff_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Staff', 'Receptionist', 'Dentist', 'Patient', 'Guest') NOT NULL, \`gender\` enum ('Male', 'Female', 'Other') NOT NULL, \`contact_number\` varchar(15) NOT NULL, \`email\` varchar(255) NOT NULL, \`hire_date\` date NOT NULL, UNIQUE INDEX \`IDX_902985a964245652d5e3a0f5f6\` (\`email\`), PRIMARY KEY (\`staff_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patients\` (\`patient_id\` int NOT NULL AUTO_INCREMENT, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`date_of_birth\` date NOT NULL, \`gender\` enum ('Male', 'Female', 'Other') NOT NULL, \`contact_number\` varchar(15) NOT NULL, \`email\` varchar(255) NOT NULL, \`address\` varchar(255) NULL, \`registration_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_64e2031265399f5690b0beba6a\` (\`email\`), PRIMARY KEY (\`patient_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('Admin', 'Staff', 'Receptionist', 'Dentist', 'Patient', 'Guest') NOT NULL DEFAULT 'Guest', \`staffStaffId\` int NULL, \`patientPatientId\` int NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`REL_c07863a38c0ca837decb81b28a\` (\`patientPatientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`treatments\` (\`treatment_id\` int NOT NULL AUTO_INCREMENT, \`treatment_name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`cost\` decimal(10,2) NOT NULL, PRIMARY KEY (\`treatment_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`appointments\` (\`appointment_id\` int NOT NULL AUTO_INCREMENT, \`appointment_date\` datetime NOT NULL, \`status\` enum ('Scheduled', 'Completed', 'Cancelled', 'No-Show') NOT NULL DEFAULT 'Scheduled', \`notes\` varchar(255) NULL, \`patientPatientId\` int NULL, \`staffStaffId\` int NULL, PRIMARY KEY (\`appointment_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`patient_treatments\` (\`patient_treatment_id\` int NOT NULL AUTO_INCREMENT, \`notes\` varchar(255) NULL, \`patientPatientId\` int NULL, \`treatmentTreatmentId\` int NULL, \`appointmentAppointmentId\` int NULL, PRIMARY KEY (\`patient_treatment_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`billing\` (\`bill_id\` int NOT NULL AUTO_INCREMENT, \`total_amount\` decimal(10,2) NOT NULL, \`amount_paid\` decimal(10,2) NOT NULL DEFAULT '0.00', \`payment_status\` enum ('Paid', 'Pending', 'Partially Paid') NOT NULL DEFAULT 'Pending', \`payment_date\` datetime NULL, \`patientPatientId\` int NULL, \`appointmentAppointmentId\` int NULL, PRIMARY KEY (\`bill_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_8ff6d2f32e511dfb73c832c961b\` FOREIGN KEY (\`staffStaffId\`) REFERENCES \`staff\`(\`staff_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c07863a38c0ca837decb81b28ac\` FOREIGN KEY (\`patientPatientId\`) REFERENCES \`patients\`(\`patient_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_669db51cd07b8a65bee9aaf9c4a\` FOREIGN KEY (\`patientPatientId\`) REFERENCES \`patients\`(\`patient_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`appointments\` ADD CONSTRAINT \`FK_a653f25083f24810a2988e9d125\` FOREIGN KEY (\`staffStaffId\`) REFERENCES \`staff\`(\`staff_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` ADD CONSTRAINT \`FK_81ab01dc3f9a00a10eb08b4d091\` FOREIGN KEY (\`patientPatientId\`) REFERENCES \`patients\`(\`patient_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` ADD CONSTRAINT \`FK_9b7ee5bc21373d8458d61d5b854\` FOREIGN KEY (\`treatmentTreatmentId\`) REFERENCES \`treatments\`(\`treatment_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` ADD CONSTRAINT \`FK_2593abd5b1546954e5fd64de544\` FOREIGN KEY (\`appointmentAppointmentId\`) REFERENCES \`appointments\`(\`appointment_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`billing\` ADD CONSTRAINT \`FK_7a4cbee232167f589034579058d\` FOREIGN KEY (\`patientPatientId\`) REFERENCES \`patients\`(\`patient_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`billing\` ADD CONSTRAINT \`FK_f22ac204d60b28abdbe5d846570\` FOREIGN KEY (\`appointmentAppointmentId\`) REFERENCES \`appointments\`(\`appointment_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`billing\` DROP FOREIGN KEY \`FK_f22ac204d60b28abdbe5d846570\``);
        await queryRunner.query(`ALTER TABLE \`billing\` DROP FOREIGN KEY \`FK_7a4cbee232167f589034579058d\``);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` DROP FOREIGN KEY \`FK_2593abd5b1546954e5fd64de544\``);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` DROP FOREIGN KEY \`FK_9b7ee5bc21373d8458d61d5b854\``);
        await queryRunner.query(`ALTER TABLE \`patient_treatments\` DROP FOREIGN KEY \`FK_81ab01dc3f9a00a10eb08b4d091\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_a653f25083f24810a2988e9d125\``);
        await queryRunner.query(`ALTER TABLE \`appointments\` DROP FOREIGN KEY \`FK_669db51cd07b8a65bee9aaf9c4a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c07863a38c0ca837decb81b28ac\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_8ff6d2f32e511dfb73c832c961b\``);
        await queryRunner.query(`DROP TABLE \`billing\``);
        await queryRunner.query(`DROP TABLE \`patient_treatments\``);
        await queryRunner.query(`DROP TABLE \`appointments\``);
        await queryRunner.query(`DROP TABLE \`treatments\``);
        await queryRunner.query(`DROP INDEX \`REL_c07863a38c0ca837decb81b28a\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_64e2031265399f5690b0beba6a\` ON \`patients\``);
        await queryRunner.query(`DROP TABLE \`patients\``);
        await queryRunner.query(`DROP INDEX \`IDX_902985a964245652d5e3a0f5f6\` ON \`staff\``);
        await queryRunner.query(`DROP TABLE \`staff\``);
    }

}
