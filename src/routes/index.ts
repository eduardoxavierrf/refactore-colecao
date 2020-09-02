import { Router } from 'express';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', sessionsRouter);

export default router;
