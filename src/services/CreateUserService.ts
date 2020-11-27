/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    name: string;

    email: string;

    password: string;

    count_items: boolean;

    count_collections: boolean;

    count_categories: boolean;
}

class CreateUserService {
    public async execute({
        name,
        email,
        password,
        count_collections,
        count_categories,
        count_items,
    }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new AppError('Email already exists!');
        }

        const hashedPassword = await hash(password, 10);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            count_collections,
            count_categories,
            count_items,
        });

        await userRepository.save(user);

        delete user.password;
        return user;
    }
}

export default CreateUserService;
