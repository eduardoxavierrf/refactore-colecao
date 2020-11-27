/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateCategoryService from '../services/CreateCategoryService';

import AppError from '../errors/AppError';

import Category from '../models/Category';

export default class CategoryController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, description, collection_id, supercategory_id } = req.body;

        const createCategory = new CreateCategoryService();

        const category = await createCategory.execute({
            name,
            description,
            collection_id,
            supercategory_id,
            user_id: req.user.id,
        });

        return res.status(200).json(category);
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const { collectionID } = req.params;

        const categoryRepository = getRepository(Category);

        const categories = await categoryRepository.find({
            where: {
                collection_id: collectionID,
                supercategory_id: null,
            },
            relations: [
                'subcategory',
                'subcategory.subcategory',
                'subcategory.subcategory.subcategory',
                'subcategory.subcategory.subcategory.subcategory',
            ],
        });

        return res.status(200).json(categories);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { categoryID } = req.params;
        const categoryRepository = getRepository(Category);

        const category = await categoryRepository.findOne({
            where: {
                id: categoryID,
            },
            relations: ['collection'],
        });

        if (!category) {
            throw new AppError('This category do not exists!');
        }
        if (!(category.collection.created_by === req.user.id)) {
            throw new AppError('This user can only delete his own categories');
        }

        await categoryRepository.remove(category);

        return res.status(204).json();
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { categoryID } = req.params;

        const { name, description } = req.body;

        const categoryRepository = getRepository(Category);

        const category = await categoryRepository.findOne(categoryID, {
            relations: ['collection'],
        });

        if (!category) {
            throw new AppError('This category do not exists!');
        }

        if (!(category.collection.user.id === req.user.id)) {
            throw new AppError('This user can only edit his own categories!');
        }

        if (name) {
            category.name = name;
        }

        if (description) {
            category.description = description;
        }

        await categoryRepository.save(category);

        return res.status(200).json(category);
    }
}
