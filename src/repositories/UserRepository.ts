/* eslint-disable camelcase */
import {
    Repository,
    EntityRepository,
    getRepository,
    createQueryBuilder,
} from 'typeorm';
import User from '../models/User';
import Item from '../models/Item';
import Collection from '../models/Collection';
import Category from '../models/Category';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    async findUserbyEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({
            where: {
                email,
            },
        });

        if (user) {
            const itemRepository = getRepository(Item);
            const categoryRepository = getRepository(Category);
            const collectionRepository = getRepository(Collection);

            const collectionCount = await collectionRepository.count({
                where: {
                    created_by: user.id,
                    count_collection: true,
                },
            });

            let categoryCount = 0;

            const collectionsToCountCategory = await collectionRepository.find({
                where: {
                    created_by: user.id,
                    count_categories: true,
                },
            });

            collectionsToCountCategory.forEach(async e => {
                const categoriesNumber = await categoryRepository.count({
                    where: {
                        collection_id: e.id,
                    },
                });

                categoryCount += categoriesNumber;
            });

            const collectionsToCountItems = await collectionRepository.find({
                where: {
                    created_by: user.id,
                },
            });

            let itemsCount = 0;

            collectionsToCountItems.forEach(async e => {
                const itemsNumber = await itemRepository.count({
                    where: {
                        collection_id: e.id,
                    },
                });

                itemsCount += itemsNumber;
            });

            user.collection_amount = collectionCount;
            user.category_amount = categoryCount;
            user.item_amount = itemsCount;
        }
        return user;
    }
}
