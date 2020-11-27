/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateItemService from '../services/CreteitemService';

export default class ItemController {
    public async create(req: Request, res: Response): Promise<Response> {
        const {
            name,
            image_url,
            category_id,
            metadata,
            collection_id,
            description,
        } = req.body;
        const userID = req.user.id;
        const createItem = new CreateItemService();

        const item = await createItem.execute({
            name,
            image_url,
            category_id,
            metadata,
            user_id: userID,
            collection_id,
            description,
        });

        return res.status(200).json(item);
    }
}
