import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Cart, Order} from '@/models';

const postOrder: RequestHandler = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).render('other/not-found', {title: 'User not found'});

        const cart = await Cart.findByUserId(userId);
        if (!cart) return res.status(400).render('other/not-found', {title: 'Cart not found'});

        const products = cart.products;
        if (!products.length) return res.status(400).render('other/not-found', {title: 'Cart is empty.'});

        const order = await new Order({userId, products}).create();
        if (!order) return res.status(500).render('other/not-found', {title: 'Failed to create order.'});

        await cart.clearCart();

        res.redirect(Routes.orders);
    } catch (error) {
        logger.error(error, 'Error creating order');
        return res.status(500).render('other/not-found', {title: 'Failed to create order.'});
    }
};

export default postOrder;
