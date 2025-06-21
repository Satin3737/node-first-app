import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const postOrder: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const cart = await user.getCart();
        if (!cart) await user.createCart();

        const products = await cart.getProducts();
        if (!products.length) return res.status(400).render('other/not-found', {title: 'Cart is empty.'});

        const order = await user.createOrder();
        if (!order) return res.status(500).render('other/not-found', {title: 'Failed to create order.'});

        for (const product of products) {
            await order.addProduct(product, {through: {quantity: product.cartItem.quantity}});
        }

        await cart.setProducts([]);

        res.redirect(ROUTES.orders);
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).render('other/not-found', {title: 'Failed to create order.'});
    }
};

export default postOrder;
