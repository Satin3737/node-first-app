import Product from '@/models/Product';
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
        console.error('Error in getAdminProducts:', error);
        res.status(500).render('other/not-found', {title: 'Error fetching products'});
    }
};

export default getAdminProducts;
