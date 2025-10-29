import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

const postCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.productId;

        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const product = await Product.findById(id);
        if (!product) return res.status(404).render('other/not-found', {title: 'Product not found'});

        await user.addToCart(product);

        res.redirect(Routes.cart);
    } catch (error) {
        logger.error(error, 'Error adding product to cart');
        res.status(500).render('other/not-found', {title: 'Failed to add product to cart.'});
    }
};

export default postCart;
