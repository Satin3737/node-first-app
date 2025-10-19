import {RequestHandler} from 'express';
import {logger} from '@/utils';
import {Product} from '@/models';

const getEditProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);

        if (!product) res.status(404).render('other/not-found', {title: 'Product not found'});

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
