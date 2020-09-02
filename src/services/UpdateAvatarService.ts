/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import path from 'path';
import fs from 'fs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
    user_id: string;

    avatarFileName: string;
}

class AvatarUpdateService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new AppError("User don't exists");
        }

        if (user.image_url) {
            const userAvatarFilePath = path.join(
                path.resolve(__dirname, '..', '..', 'temp'),
                user.image_url,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.image_url = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default AvatarUpdateService;
