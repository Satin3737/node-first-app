import {Router} from 'express';
import {ROUTES} from '@/enum';
import {getCart, getOrders, getProduct, getShop, postCart, postOrder, removeFromCart} from '@/controllers/shop';

const shopRouter = Router();

shopRouter.get(ROUTES.shop, getShop);
shopRouter.get(ROUTES.product, getProduct);
shopRouter.get(ROUTES.cart, getCart);
shopRouter.post(ROUTES.cart, postCart);
shopRouter.post(ROUTES.removeFromCart, removeFromCart);
shopRouter.post(ROUTES.createOrder, postOrder);
shopRouter.get(ROUTES.orders, getOrders);

export default shopRouter;
