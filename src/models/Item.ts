/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import Category from './Category';
import Collection from './Collection';
import ItemImage from './ItemImage';

@Entity('items')
class Item {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    image_url: string;

    @Column('uuid')
    category_id: string;

    @Column('uuid')
    collection_id: string;

    @Column('varchar')
    metadata: string;

    @Column('varchar')
    description: string;

    @ManyToOne(type => Category, category => category.items)
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @ManyToOne(type => Collection, collection => collection.items)
    @JoinColumn({ name: 'collection_id' })
    collection: Collection;

    @OneToMany(type => ItemImage, itemimage => itemimage.item)
    item_images: ItemImage[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Item;
