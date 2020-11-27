/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Item from '../models/Item';
import Category from '../models/Category';
import Collection from '../models/Collection';

interface Request {
    name: string;

    image_url: string;

    category_id: string;

    metadata: string;

    user_id: string;

    description: string;

    collection_id: string;
}

class CreateItemService {
    public async execute({
        name,
        image_url,
        category_id,
        metadata,
        user_id,
        collection_id,
        description,
    }: Request): Promise<Item> {
        const itemRepository = getRepository(Item);
        const collectionRepository = getRepository(Collection);
        const categoryRepository = getRepository(Category);

        const checkUserOwner = await collectionRepository.findOne(
            collection_id,
            {
                relations: ['user'],
            },
        );

        if (!checkUserOwner) {
            throw new AppError('Essa coleção não existe!');
        }

        if (!(checkUserOwner.user.id === user_id)) {
            throw new AppError('Você só pode criar items na propria coleção!');
        }
        if (!(category_id == null)) {
            const checkCategoryExists = await categoryRepository.findOne({
                where: {
                    id: category_id,
                    collection_id,
                },
            });

            if (!checkCategoryExists) {
                throw new AppError('Essa categoria não existe nessa coleção!');
            }
        }

        const checkNameExists = await itemRepository.findOne({
            where: {
                collection_id,
                name,
            },
        });

        if (checkNameExists) {
            throw new AppError('Essa coleção já tem um item com esse nome!');
        }

        const item = itemRepository.create({
            name,
            category_id,
            image_url,
            metadata,
            collection_id,
            description,
        });

        await itemRepository.save(item);

        return item;
    }
}

export default CreateItemService;
