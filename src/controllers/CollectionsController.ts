/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateCollectionService from '../services/CreateCollectionService';
import UpdateCollectionService from '../services/UpdateCollectionService';
import Collection from '../models/Collection';
import AppError from '../errors/AppError';

export default class CollectionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            description,
            image_url,
            user_id,
            color,
            count_collection,
            count_categories,
            order_alphabetically,
        } = req.body;

        if (!(user_id === req.user.id)) {
            throw new AppError(
                'This user can only create his own collections!',
            );
        }
        const createCollection = new CreateCollectionService();

        const collection = await createCollection.execute({
            name,
            description,
            image_url,
            user_id,
            color,
            count_collection,
            count_categories,
            order_alphabetically,
        });

        return res.status(201).json(collection);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { collectionID } = req.params;
        const {
            name,
            description,
            image_url,
            color,
            count_collection,
            count_categories,
            order_alphabetically,
        } = req.body;

        const updateCollection = new UpdateCollectionService();

        const collection = await updateCollection.execute({
            id: collectionID,
            description,
            name,
            image_url,
            user_id: req.user.id,
            color,
            count_collection,
            count_categories,
            order_alphabetically,
        });

        return res.status(200).json(collection);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { collectionID } = req.params;
        const collectionRepository = getRepository(Collection);

        const collection = await collectionRepository.findOne(collectionID);

        if (!collection) {
            throw new AppError('This collection do not exists!');
        }

        if (!(collection.created_by === req.user.id)) {
            throw new AppError('This user can only delete his own collections');
        }

        await collectionRepository.remove(collection);

        return res.status(204).json();
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const { userID } = req.params;
        const collectionRepository = getRepository(Collection);

        const collections = await collectionRepository.find({
            where: {
                created_by: userID,
            },
        });

        return res.status(200).json(collections);
    }
}
