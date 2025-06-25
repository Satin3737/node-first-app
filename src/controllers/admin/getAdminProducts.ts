import Product from '@/models/Product';
import logger from '@/utils/logger';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const getAdminProducts: RequestHandler = async (_, res) => {
    try {
        const products = await Product.findAll();
        res.render('admin/products', {
            path: ROUTES.adminProducts,
            title: 'Products',
            products
        });
    } catch (error) {
        logger.error(error, 'Error in getAdminProducts');
        res.status(500).render('other/not-found', {title: 'Error fetching products'});
    }
};

export default getAdminProducts;
