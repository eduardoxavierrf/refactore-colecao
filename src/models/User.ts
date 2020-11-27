/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import Collection from './Collection';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('boolean')
    count_items: boolean;

    @Column('boolean')
    count_collections: boolean;

    @Column('boolean')
    count_categories: boolean;

    @Column('varchar')
    image_url: string;

    @Column('varchar')
    password: string;

    collection_amount: number;

    category_amount: number;

    item_amount: number;

    @OneToMany(type => Collection, collection => collection.user)
    collections: Collection[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
