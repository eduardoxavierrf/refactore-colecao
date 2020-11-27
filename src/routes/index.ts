import { Router } from 'express';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import collectionRouter from './collection.routes';
import categoryRouter from './category.routes';
import itemRouter from './items.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', sessionsRouter);
router.use('/collections', collectionRouter);
router.use('/categories', categoryRouter);
router.use('/items', itemRouter);

export default router;
