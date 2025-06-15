import {Cart} from '@/models/Cart';
import {Product} from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

export const getShop: RequestHandler = (_, res) => {
    Product.fetchAll((products: Product[]) => {
        res.render('shop/products', {
            path: ROUTES.shop,
            title: 'Shop',
            products
        });
    });
};

export const getProduct: RequestHandler = (req, res) => {
    const productId = req.params.productId;
    Product.fetchById(productId, (product: Product) => {
        res.render('shop/product', {
            path: ROUTES.shop,
            title: `Product ${product?.title}`,
            product
        });
    });
};

export const getCart: RequestHandler = (_, res) => {
    Cart.fetchCart((cart: Cart) => {
        res.render('shop/cart', {
            path: ROUTES.cart,
            title: 'Your Cart',
            cart
        });
    });
};

export const postCart: RequestHandler = (req, res) => {
    const productId = req.body.productId;
    Cart.addToCart(productId);
    res.redirect(ROUTES.cart);
};

export const removeFromCart: RequestHandler = (req, res) => {
    const productId = req.body.id;
    Cart.removeFromCart(productId);
    res.redirect(ROUTES.cart);
};

export const getOrders: RequestHandler = (_, res) => {
    res.render('shop/orders', {
        path: ROUTES.orders,
        title: 'Your Orders'
    });
};

export const getCheckout: RequestHandler = (_, res) => {
    res.render('shop/checkout', {
        path: ROUTES.checkout,
        title: 'Your Checkout'
    });
};
