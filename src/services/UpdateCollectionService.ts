/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import Collection from '../models/Collection';
import AppError from '../errors/AppError';

interface Request {
    id: string;

    name: string;

    description: string;

    image_url: string;

    user_id: string;

    color: string;

    count_collection: boolean;

    count_categories: boolean;

    order_alphabetically: boolean;
}

class UpdateCollectionService {
    public async execute({
        id,
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

        const collection = await collectionRepository.findOne(id);

        if (!collection) {
            throw new AppError('Collection do not exist!');
        }

        if (!(user_id === collection.created_by)) {
            throw new AppError(
                'This user can only update his own collections!',
            );
        }
        if (name) {
            const checkNameExists = await collectionRepository.findOne({
                where: {
                    name,
                    created_by: collection.created_by,
                },
            });

            if (checkNameExists) {
                throw new AppError(
                    'This user already have a collection with this name!',
                );
            }

            collection.name = name;
        }

        if (image_url) {
            // Apagar imagem existente do servidor de imagens
            // registrar nova imagem

            collection.image_url = image_url;
        }

        if (description) {
            collection.description = description;
        }
        if (color) {
            collection.color = color;
        }
        if (count_collection !== undefined) {
            collection.count_collection = count_collection;
        }
        if (count_categories !== undefined) {
            collection.count_categories = count_categories;
        }
        if (order_alphabetically !== undefined) {
            collection.order_alphabetically = order_alphabetically;
        }

        await collectionRepository.save(collection);

        return collection;
    }
}

export default UpdateCollectionService;
