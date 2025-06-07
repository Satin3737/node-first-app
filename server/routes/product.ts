import {Router} from 'express';
import {ROUTES} from '@/enum';
import {getAddProduct, postAddProduct} from '@/controllers/product';

const productRouter = Router();

productRouter.get(ROUTES.addProduct, getAddProduct);
productRouter.post(ROUTES.product, postAddProduct);

export default productRouter;
