import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {getId, logger} from '@/utils';
import {Order, Product} from '@/models';

const getOrders: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const ordersData = await Order.findByUserId(user._id);

        const productIdsInOrders = new Set(
            ordersData.flatMap(order => order.products.map(item => item.productId.toString()))
        );

        const productsData = await Product.findByIdsArray(Array.from(productIdsInOrders).map(getId));

        const orders = ordersData.map(order => ({
            ...order,
            products: order.products.map(({productId, quantity}) => ({
                product: productsData.find(prod => prod._id.toString() === productId.toString()),
                quantity
            }))
        }));

        res.render('shop/orders', {
            path: Routes.orders,
            title: 'Your Orders',
            orders
        });
    } catch (error) {
        logger.error(error, 'Error fetching orders');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default getOrders;
