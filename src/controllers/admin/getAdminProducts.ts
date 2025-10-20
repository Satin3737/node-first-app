import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

const getAdminProducts: RequestHandler = async (_, res) => {
    try {
        const products = await Product.find();
        res.render('admin/products', {
            path: Routes.adminProducts,
            title: 'Products',
            products
        });
    } catch (error) {
        logger.error(error, 'Error in getAdminProducts');
        res.status(500).render('other/not-found', {title: 'Error fetching products'});
    }
};

export default getAdminProducts;
