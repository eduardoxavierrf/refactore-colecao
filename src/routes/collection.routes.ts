import { Router } from 'express';

import CollectionsController from '../controllers/CollectionsController';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import CategoryController from '../controllers/CategoryController';

const collectionRouter = Router();
const collectionsController = new CollectionsController();
const categoryController = new CategoryController();

collectionRouter.use(ensureAuthentication);
collectionRouter.post('/', collectionsController.create);
collectionRouter.patch('/:collectionID', collectionsController.update);
collectionRouter.delete('/:collectionID', collectionsController.delete);
collectionRouter.get('/:collectionID/categories', categoryController.index);

export default collectionRouter;
