import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp'),
        filename(request, file, callback) {
            const filehash = crypto.randomBytes(10).toString('hex');
            const fileName = `${filehash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
