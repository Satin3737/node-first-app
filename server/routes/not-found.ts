import {Router} from 'express';
import {notFoundController} from '@/controllers/not-found';

const notFoundRouter = Router();

notFoundRouter.use(notFoundController);

export default notFoundRouter;
