import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateInitialModels1591463442935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'unions',
      columns: [
        { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
        { name: 'name', type: 'varchar', length: '40' },
        { name: 'slug', type: 'varchar', length: '40' },
        { name: 'description', type: 'text', isNullable: true },
        { name: "created_at", type: "timestamp with time zone", default: 'current_timestamp' },
        { name: "updated_at", type: "timestamp with time zone", default: 'current_timestamp' },
      ],
      indices: [
        { columnNames: ['name'], isUnique: true },
        { columnNames: ['slug'], isUnique: true },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
        { name: 'uuid', type: 'varchar', length: '36' },
        { name: 'name', type: 'varchar', length: '40' },
        { name: 'description', type: 'text', isNullable: true },
        { name: "created_at", type: "timestamp with time zone", default: 'current_timestamp' },
        { name: "updated_at", type: "timestamp with time zone", default: 'current_timestamp' },
      ],
      indices: [
        { columnNames: ['uuid'], isUnique: true },
        { columnNames: ['name'], isUnique: true },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'union_user_relations',
      columns: [
        { name: 'union_id', type: 'bigint' },
        { name: 'user_id', type: 'bigint' },
      ],
      indices: [
        { columnNames: ['union_id'] },
        { columnNames: ['user_id'] },
      ],
    }));

    await queryRunner.createTable(new Table({
      name: 'access_tokens',
      columns: [
        { name: 'id', type: 'bigint', isPrimary: true, isGenerated: true },
        { name: 'access_key', type: 'varchar', length: '40' },
        { name: 'refresh_key', type: 'varchar', length: '40' },
        { name: 'access_expire_at', type: 'timestamp with time zone' },
        { name: 'refresh_expire_at', type: 'timestamp with time zone' },
        { name: 'user_id', type: 'bigint' },
        { name: 'created_at', type: 'timestamp with time zone', default: 'current_timestamp' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'current_timestamp' },
      ],
      indices: [
        { columnNames: ['access_key'], isUnique: true },
        { columnNames: ['refresh_key'], isUnique: true },
        { columnNames: ['user_id'] },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('access_tokens');
    await queryRunner.dropTable('union_user_relations');
    await queryRunner.dropTable('users');
    await queryRunner.dropTable('unions');
  }
}
