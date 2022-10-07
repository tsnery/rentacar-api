import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSpecificationsCars1665105117449 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'specifications_cars',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true
        },
        {
          name: 'car_id',
          type: 'uuid'
        },
        {
          name: 'specification_id',
          type: 'uuid'
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()'
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()'
        }
      ],
      foreignKeys: [
        {
          name: 'FKSpecificationsCars',
          referencedTableName: 'specifications',
          referencedColumnNames: ['id'],
          columnNames: ['specification_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL'
        },
        {
          name: 'FKCarsSpecifications',
          referencedTableName: 'cars',
          referencedColumnNames: ['id'],
          columnNames: ['car_id'],
          onDelete: 'SET NULL',
          onUpdate: 'SET NULL'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationsCars')
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarsSpecifications')
    await queryRunner.dropTable('specifications_cars')
  }

}
