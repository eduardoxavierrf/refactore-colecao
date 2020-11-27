import { Router } from 'express';

import CategoryController from '../controllers/CategoryController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const categoryRouter = Router();
const categoryController = new CategoryController();

categoryRouter.use(ensureAuthentication);
categoryRouter.post('/', categoryController.create);
categoryRouter.delete('/:categoryID', categoryController.delete);
categoryRouter.patch('/:categoryID', categoryController.update);

export default categoryRouter;
