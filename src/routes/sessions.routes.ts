import { Router } from 'express';

import AuthController from '../controllers/AuthController';

const sessionsRouter = Router();
const authController = new AuthController();

sessionsRouter.post('/', authController.create);

export default sessionsRouter;
