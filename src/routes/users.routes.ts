import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAutheticaion from '../middlewares/ensureAuthentication';
import UpdateAvatarSevice from '../services/UpdateAvatarService';

const userRouter = Router();

const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });

    user.password = '';

    return res.status(201).json(user);
});

userRouter.patch(
    '/avatar',
    ensureAutheticaion,
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
