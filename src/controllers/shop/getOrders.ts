import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Order} from '@/models';

const getOrders: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const orders = await Order.findByUserId(user._id);

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
