import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnName1736021952246 implements MigrationInterface {
    name = 'UpdateColumnName1736021952246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_901039a35ef047c20cdb4b5209\` ON \`users\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_901039a35ef047c20cdb4b5209\` ON \`users\` (\`patientId\`)`);
    }

}
