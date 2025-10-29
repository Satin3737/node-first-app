import type {RequestHandler} from 'express';
import {type CartPopulated, Routes} from '@/interfaces';
import {logger} from '@/utils';

const getCart: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const products = (await user.populate<CartPopulated>('cart.items.product')).cart.items;
        const totalPrice = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        res.render('shop/cart', {
            path: Routes.cart,
            title: 'Your Cart',
            products,
            totalPrice
        });
    } catch (error) {
        logger.error(error, 'Error fetching cart');
        res.status(500).render('other/not-found', {title: 'Failed to load cart.'});
    }
};

export default getCart;
