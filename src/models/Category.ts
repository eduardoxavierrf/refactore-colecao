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

import Collection from './Collection';
import Item from './Item';

@Entity('categories')
// @Tree('nested-set')
class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column('uuid')
    supercategory_id: string;

    // @TreeParent()
    @ManyToOne(type => Category, category => category.subcategory)
    @JoinColumn({ name: 'supercategory_id' })
    supercategory: Category;

    // @TreeChildren({ cascade: true })
    @OneToMany(type => Category, category => category.supercategory)
    subcategory: Category[];

    @OneToMany(type => Item, item => item.category)
    items: Item[];

    @Column('uuid')
    collection_id: string;

    @ManyToOne(type => Collection, collection => collection.categories)
    @JoinColumn({ name: 'collection_id' })
    collection: Collection;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Category;
