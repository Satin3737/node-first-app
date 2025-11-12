import type {RequestHandler} from 'express';
import fs from 'fs';
import path from 'path';
import {InvoicesDir} from '@/const';
import {logger} from '@/utils';
import {Order} from '@/models';

const getInvoice: RequestHandler = async (req, res) => {
    try {
        const orderId = req.params.orderId;

        const user = req.user;
        if (!user) return res.status(401).render('other/not-found', {title: 'User not found'});

        const order = await Order.findOne({_id: orderId, user: user._id}).lean();
        if (!order) return res.status(404).render('other/not-found', {title: 'Order not found'});

        const invoice = `${orderId}.pdf`;
        const invoicePath = path.join(InvoicesDir, invoice);

        fs.readFile(invoicePath, (err, data) => {
            if (err) {
                logger.error(err, 'Error reading invoice file');
                return res.status(404).render('other/not-found', {title: 'Invoice not found'});
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${invoice}"`);
            res.send(data);
        });
    } catch (error) {
        logger.error(error, 'Error fetching orders');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch invoice.'});
    }
};

export default getInvoice;
