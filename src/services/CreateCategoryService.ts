/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Collection from '../models/Collection';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
    name: string;

    description: string;

    collection_id: string;

    supercategory_id: string;

    user_id: string;
}

class CreateCategoryService {
    public async execute({
        name,
        description,
        collection_id,
        supercategory_id,
        user_id,
    }: Request): Promise<Category> {
        const collectionRepository = getRepository(Collection);
        const categoryRepository = getRepository(Category);

        const checkCollectionExists = await collectionRepository.findOne(
            collection_id,
            { relations: ['user'] },
        );

        if (!checkCollectionExists) {
            throw new AppError('Collection do not exists!');
        }

        if (!(checkCollectionExists.user.id === user_id)) {
            throw new AppError(
                'This user can only create categories in his own collections',
            );
        }

        if (supercategory_id !== null) {
            const checkSuperCategoryExists = await categoryRepository.findOne(
                supercategory_id,
            );

            if (!checkSuperCategoryExists) {
                throw new AppError('Category do not exists!');
            }
        }

        const category = categoryRepository.create({
            name,
            description,
            collection_id,
            supercategory_id,
        });

        await categoryRepository.save(category);

        return category;
    }
}

export default CreateCategoryService;
