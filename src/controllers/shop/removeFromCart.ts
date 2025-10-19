import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Cart, Product} from '@/models';

const removeFromCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.productId;

        const userId = req.user?._id;
        if (!userId) return res.status(404).render('other/not-found', {title: 'User not found'});

        const product = await Product.findById(id);
        if (!product) return res.status(404).render('other/not-found', {title: 'Product not found'});

        const cartData = await Cart.findByUserId(userId);
        if (!cartData) return res.status(404).render('other/not-found', {title: 'Cart not found'});

        const cart = new Cart(cartData);
        await cart.removeFromCart(product);

        res.redirect(Routes.cart);
    } catch (error) {
        logger.error(error, 'Error removing product from cart');
        return res.status(500).render('other/not-found', {title: 'Failed to remove product from cart.'});
    }
};

export default removeFromCart;
