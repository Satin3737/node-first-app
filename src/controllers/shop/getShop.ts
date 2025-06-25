import Product from '@/models/Product';
import logger from '@/utils/logger';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const getShop: RequestHandler = async (_, res) => {
    try {
        const products = await Product.findAll();
        res.render('shop/products', {
            path: ROUTES.shop,
            title: 'Shop',
            products
        });
    } catch (error) {
        logger.error(error, 'Error fetching products');
        res.status(500).render('other/not-found', {title: 'Failed to load products.'});
    }
};

export default getShop;
