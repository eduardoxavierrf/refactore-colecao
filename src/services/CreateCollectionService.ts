/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Collection from '../models/Collection';
import AppError from '../errors/AppError';

interface Request {
    name: string;

    description: string;

    image_url: string;
}

class CreateCollectionService {
    public async execute({
        name,
        description,
        image_url,
    }: Request): Promise<void> {}
}

export default CreateCollectionService;
