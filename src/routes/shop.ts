import {Router} from 'express';
import {ROUTES} from '@/enum';
import {getCart, getCheckout, getOrders, getProduct, getShop, postCart, removeFromCart} from '@/controllers/shop';

const shopRouter = Router();

shopRouter.get(ROUTES.shop, getShop);
shopRouter.get(ROUTES.product, getProduct);
shopRouter.get(ROUTES.cart, getCart);
shopRouter.post(ROUTES.cart, postCart);
shopRouter.post(ROUTES.removeFromCart, removeFromCart);
shopRouter.get(ROUTES.orders, getOrders);
shopRouter.get(ROUTES.checkout, getCheckout);

export default shopRouter;
