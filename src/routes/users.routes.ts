/* eslint-disable camelcase */
import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UpdateAvatarSevice from '../services/UpdateAvatarService';
import UserController from '../controllers/UsersController';
import CollectionController from '../controllers/CollectionsController';

const userController = new UserController();
const collectionController = new CollectionController();

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.post('/', userController.create);
userRouter.get(
    '/:userID/collections',
    ensureAuthentication,
    collectionController.index,
);

userRouter.patch(
    '/avatar',
    ensureAuthentication,
    upload.single('avatar'),
    async (req, res) => {
        const updateAvatarSevice = new UpdateAvatarSevice();

        const user = await updateAvatarSevice.execute({
            user_id: req.user.id,
            avatarFileName: req.file.filename,
        });

        return res.json(user);
    },
);

export default userRouter;
