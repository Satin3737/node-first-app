import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const removeFromCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.id;

        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const cart = await user.getCart();
        if (!cart) await user.createCart();

        const products = await cart.getProducts({where: {id}});
        if (!products.length) return res.status(404).render('other/not-found', {title: 'Product not found in cart'});

        const product = products[0];
        await product.cartItem.destroy();

        res.redirect(ROUTES.cart);
    } catch (error) {
        console.error('Error removing product from cart:', error);
        return res.status(500).render('other/not-found', {title: 'Failed to remove product from cart.'});
    }
};

export default removeFromCart;
