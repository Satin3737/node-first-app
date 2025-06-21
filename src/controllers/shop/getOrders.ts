import Product from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const getOrders: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const orders = await user.getOrders({include: Product});

        res.render('shop/orders', {
            path: ROUTES.orders,
            title: 'Your Orders',
            orders
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default getOrders;
