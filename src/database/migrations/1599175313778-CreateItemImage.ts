import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateItemImage1599175313778
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'items_images',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'image_url',
                        type: 'varchar',
                    },
                    {
                        name: 'item_id',
                        type: 'uuid',
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
                foreignKeys: [
                    {
                        name: 'ItemImage',
                        columnNames: ['item_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'items',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('items_images', 'ItemImage');
        await queryRunner.dropTable('items_images');
    }
}
