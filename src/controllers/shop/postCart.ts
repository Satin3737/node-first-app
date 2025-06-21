import Product from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const postCart: RequestHandler = async (req, res) => {
    try {
        const id = req.body.productId;

        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const cart = await user.getCart();
        if (!cart) await user.createCart();

        const products = await cart.getProducts({where: {id}});

        if (products.length) {
            const product = products[0];
            const quantity = product.cartItem.quantity + 1;
            await cart.addProduct(product, {through: {quantity}});
        } else {
            const product = await Product.findByPk(id);
            if (!product) return res.status(404).render('other/not-found', {title: 'Product not found'});
            await cart.addProduct(product, {through: {quantity: 1}});
        }

        res.redirect(ROUTES.cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).render('other/not-found', {title: 'Failed to add product to cart.'});
    }
};

export default postCart;
