import {Router} from 'express';
import path from 'path';
import {ROUTES} from '@/enum';
import {VIEWS_PATH} from '@/const';

const productRouter = Router();

productRouter.get(ROUTES.addProduct, (_, res) => {
    res.sendFile(path.join(VIEWS_PATH, 'addProduct.html'));
});

productRouter.post(ROUTES.product, (req, res) => {
    console.log(req.body);
    res.redirect(ROUTES.shop);
});

export default productRouter;
