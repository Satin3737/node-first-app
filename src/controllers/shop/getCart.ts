import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Cart, Product} from '@/models';

const getCart: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const cart = (await Cart.findByUserId(user._id)) || new Cart({userId: user._id, products: []});
        const productsData = await Product.findByIdsArray(cart.products.map(item => item.productId));

        const products = cart.products.map(({productId, quantity}) => ({
            product: productsData.find(prod => prod._id.toString() === productId.toString()),
            quantity
        }));

        const totalPrice = products.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

        res.render('shop/cart', {
            path: Routes.cart,
            title: 'Your Cart',
            products,
            totalPrice
        });
    } catch (error) {
        logger.error(error, 'Error fetching cart');
        res.status(500).render('other/not-found', {title: 'Failed to load cart.'});
    }
};

export default getCart;
