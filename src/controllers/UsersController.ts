/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            email,
            password,
            count_categories,
            count_collections,
            count_items,
        } = req.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password,
            count_collections,
            count_categories,
            count_items,
        });

        return res.status(201).json(user);
    }
}
