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

import User from './User';
import Item from './Item';
import Category from './Category';

@Entity('collections')
class Collection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column('varchar')
    image_url: string;

    @Column('varchar')
    color: string;

    @Column('uuid')
    created_by: string;

    @Column('boolean')
    count_collection: boolean;

    @Column('boolean')
    count_categories: boolean;

    @Column('boolean')
    order_alphabetically: boolean;

    @ManyToOne(type => User, user => user.collections)
    @JoinColumn({ name: 'created_by' })
    user: User;

    @OneToMany(type => Item, item => item.collection)
    items: Item[];

    @OneToMany(type => Category, category => category.collection)
    categories: Category[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Collection;
