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

import Item from './Item';

@Entity('items')
class ItemImage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    image_url: string;

    @Column('uuid')
    item_id: string;

    @ManyToOne(type => Item, item => item.item_images)
    @JoinColumn({ name: 'item_id' })
    item: Item;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default ItemImage;
