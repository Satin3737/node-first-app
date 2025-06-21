import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const getCart: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const cart = await user.getCart();
        if (!cart) await user.createCart();

        const products = await cart.getProducts();

        res.render('shop/cart', {
            path: ROUTES.cart,
            title: 'Your Cart',
            products
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).render('other/not-found', {title: 'Failed to load cart.'});
    }
};

export default getCart;
