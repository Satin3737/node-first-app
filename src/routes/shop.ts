import {Router} from 'express';
import {Routes} from '@/interfaces';
import {getCart, getOrders, getProduct, getShop, postCart, postOrder, removeFromCart} from '@/controllers/shop';

const shopRouter = Router();

shopRouter.get(Routes.shop, getShop);
shopRouter.get(Routes.product, getProduct);
shopRouter.get(Routes.cart, getCart);
shopRouter.post(Routes.cart, postCart);
shopRouter.post(Routes.removeFromCart, removeFromCart);
shopRouter.get(Routes.orders, getOrders);
shopRouter.post(Routes.createOrder, postOrder);

export default shopRouter;
