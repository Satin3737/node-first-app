import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Cart, Product} from '@/models';

const postCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.productId;

        const userId = req.user?._id;
        if (!userId) return res.status(401).render('other/not-found', {title: 'User not found'});

        const product = await Product.findById(id);
        if (!product) return res.status(404).render('other/not-found', {title: 'Product not found'});

        const cartData = await Cart.findByUserId(userId);

        if (cartData) {
            await new Cart(cartData).addToCart(product);
        } else {
            const cart = new Cart({userId, products: [], totalPrice: 0});
            await cart.create();
            await cart.addToCart(product);
        }

        res.redirect(Routes.cart);
    } catch (error) {
        logger.error(error, 'Error adding product to cart');
        res.status(500).render('other/not-found', {title: 'Failed to add product to cart.'});
    }
};

export default postCart;
