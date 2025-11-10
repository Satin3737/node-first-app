import multer, {type FileFilterCallback} from 'multer';
import {z} from 'zod';
import {MaxUploadSize, UploadsDir} from '@/const';
import {ProductImageSchema} from '@/schemas';

const imageUpload = multer({
    storage: multer.diskStorage({
        destination: (_, __, cb) => cb(null, UploadsDir),
        filename: (_, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
            cb(null, uniqueSuffix + '-' + file.originalname);
        }
    }),
    limits: {
        fileSize: MaxUploadSize
    },
    fileFilter: (_, file: Express.Multer.File, cb: FileFilterCallback) => {
        const {success, error} = ProductImageSchema.safeParse(file);
        success ? cb(null, true) : cb(new Error(z.prettifyError(error)));
    }
});

export default imageUpload;
