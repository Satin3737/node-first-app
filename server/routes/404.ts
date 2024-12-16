import {Router} from 'express';
import path from 'path';
import {VIEWS_PATH} from '@/const';

const notFoundRouter = Router();

notFoundRouter.use((_, res) => {
    res.status(404).sendFile(path.resolve(VIEWS_PATH, '404.html'));
});

export default notFoundRouter;
