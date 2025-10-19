import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

const getShop: RequestHandler = async (_, res) => {
    try {
        const products = await Product.findAll();
        res.render('shop/products', {
            path: Routes.shop,
            title: 'Shop',
            products
        });
    } catch (error) {
        logger.error(error, 'Error fetching products');
        res.status(500).render('other/not-found', {title: 'Failed to load products.'});
    }
};

export default getShop;
