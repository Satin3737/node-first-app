import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Cart} from '@/models';

const getCart: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const cart = await Cart.findByUserId(user._id);

        res.render('shop/cart', {
            path: Routes.cart,
            title: 'Your Cart',
            cart: cart || new Cart({userId: user._id, products: [], totalPrice: 0})
        });
    } catch (error) {
        logger.error(error, 'Error fetching cart');
        res.status(500).render('other/not-found', {title: 'Failed to load cart.'});
    }
};

export default getCart;
