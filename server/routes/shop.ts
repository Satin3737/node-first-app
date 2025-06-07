import {Router} from 'express';
import {ROUTES} from '@/enum';
import {getShop} from '@/controllers/shop';

const shopRouter = Router();

shopRouter.get(ROUTES.shop, getShop);

export default shopRouter;
