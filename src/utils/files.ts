import fs from 'fs';
import {logger} from '@/utils';

export const deleteFile = (filePath: string): void => {
    fs.unlink(filePath, err => {
        if (err) logger.error(err);
    });
};
