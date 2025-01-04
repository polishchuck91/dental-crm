import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPriceCommentsToTreatments1736021302090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'treatments',
      new TableColumn({
        name: 'price_comments',
        type: 'varchar',
        length: '255',
        isNullable: true, // Allows the column to be null
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('treatments', 'price_comments');
  }
}
