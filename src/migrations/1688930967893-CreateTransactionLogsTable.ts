import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionLogsTable1688930967893
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transaction_logs',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'transaction_id',
            type: 'int4',
            isNullable: false,
          },

          {
            name: 'response',
            type: 'text',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE transaction_logs`);
  }
}
