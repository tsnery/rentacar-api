import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterSpecificationsCarsDropId1665424600449 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('specifications_cars', 'id')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('specifications_cars', new TableColumn({
      name: 'id',
      type: 'uuid',
      isPrimary: true
    }))
  }

}
