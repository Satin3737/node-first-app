import {Router} from 'express';
import path from 'path';
import {ROUTES} from '@/enum';
import {VIEWS_PATH} from '@/const';

const shopRouter = Router();

shopRouter.get(ROUTES.shop, (_, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'shop.html'));
});

export default shopRouter;
