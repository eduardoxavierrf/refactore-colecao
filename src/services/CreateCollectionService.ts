/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Collection from '../models/Collection';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
    name: string;

    description: string;

    image_url: string;

    user_id: string;

    color: string;

    count_collection: boolean;

    count_categories: boolean;

    order_alphabetically: boolean;
}

class CreateCollectionService {
    public async execute({
        name,
        description,
        image_url,
        user_id,
        color,
        count_collection,
        count_categories,
        order_alphabetically,
    }: Request): Promise<Collection> {
        const collectionRepository = getRepository(Collection);
        const userRepository = getRepository(User);

        const checkUserExists = userRepository.findOne(user_id);

        if (!checkUserExists) {
            throw new AppError('This user id dont exists');
        }

        const checkCollectionNameExists = await collectionRepository.findOne({
            where: { name, created_by: user_id },
        });

        if (checkCollectionNameExists) {
            throw new AppError(
                'This user already have a collection with this name!',
            );
        }

        const collection = collectionRepository.create({
            name,
            description,
            image_url,
            created_by: user_id,
            color,
            count_collection,
            count_categories,
            order_alphabetically,
        });

        await collectionRepository.save(collection);
        return collection;
    }
}

export default CreateCollectionService;
