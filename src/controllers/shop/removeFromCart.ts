import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

const removeFromCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.productId;

        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const product = await Product.findById(id);
        if (!product) return res.status(404).render('other/not-found', {title: 'Product not found'});

        await user.removeFromCart(product);

        res.redirect(Routes.cart);
    } catch (error) {
        logger.error(error, 'Error removing product from cart');
        return res.status(500).render('other/not-found', {title: 'Failed to remove product from cart.'});
    }
};

export default removeFromCart;
