/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;

        const authenticateUser = new AuthenticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        return res.status(200).json({ user, token });
    }
}
