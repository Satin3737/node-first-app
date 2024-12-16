import {Router} from 'express';
import {ROUTES} from '@/enum';
import {PRODUCTS} from '@/routes/product';

const shopRouter = Router();

shopRouter.get(ROUTES.shop, (_, res) => {
    res.render('shop', {title: 'Shop', path: ROUTES.shop, products: PRODUCTS});
});

export default shopRouter;
