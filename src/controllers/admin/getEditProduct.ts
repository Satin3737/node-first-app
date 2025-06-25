import Product from '@/models/Product';
import logger from '@/utils/logger';
import {RequestHandler} from 'express';

const getEditProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);

        if (!product) res.status(404).render('other/not-found', {title: 'Page Not Found'});

        res.render('admin/manage-product', {
            path: '/admin/edit-product',
            title: 'Edit Product',
            editing: true,
            product
        });
    } catch (error) {
        logger.error(error, 'Error in getEditProduct');
        res.status(500).render('other/not-found', {title: 'Error fetching product for editing'});
    }
};

export default getEditProduct;
