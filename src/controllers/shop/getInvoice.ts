import type {RequestHandler} from 'express';
import {logger} from '@/utils';
import {InvoicePdf} from '@/services';
import {Order} from '@/models';

const getInvoice: RequestHandler = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const order = await Order.findOne({_id: orderId, user: user._id});
        if (!order) return res.status(404).render('other/not-found', {title: 'Order not found'});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `inline; filename="${order._id}"`);
        InvoicePdf.getFromFile(order).pipe(res);
    } catch (error) {
        logger.error(error, 'Error fetching orders');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch invoice.'});
    }
};

export default getInvoice;
