import type {RequestHandler} from 'express';
import {type CartPopulated, Routes} from '@/interfaces';
import {logger} from '@/utils';
import {InvoicePdf} from '@/services';
import {Order} from '@/models';

const postOrder: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const cartItems = (await user.populate<CartPopulated>('cart.items.product')).cart.items;
        const products = cartItems.map(item => ({...item, product: item.product.toObject({versionKey: false})}));

        const order = await new Order({user: user._id, products}).save();
        new InvoicePdf(order).saveToFile();

        await user.clearCart();

        res.redirect(Routes.orders);
    } catch (error) {
        logger.error(error, 'Error creating order');
        return res.status(500).render('other/not-found', {title: 'Failed to create order.'});
    }
};

export default postOrder;
