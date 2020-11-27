import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateCategory1599140057148 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'categories',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'collection_id',
                        type: 'uuid',
                    },
                    {
                        name: 'supercategory_id',
                        type: 'uuid',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable: false,
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'categories',
            new TableForeignKey({
                name: 'SubCategory',
                columnNames: ['supercategory_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'categories',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'categories',
            new TableForeignKey({
                name: 'CategoryCollection',
                columnNames: ['collection_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'collections',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('categories', 'CategoryCollection');
        await queryRunner.dropForeignKey('categories', 'SubCategory');
        await queryRunner.dropTable('categories');
    }
}
