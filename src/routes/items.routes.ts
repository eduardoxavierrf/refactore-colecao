import { Router } from 'express';

import ItemController from '../controllers/ItemController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const itemRouter = Router();
const itemController = new ItemController();

itemRouter.use(ensureAuthentication);
itemRouter.post('/', itemController.create);

export default itemRouter;
