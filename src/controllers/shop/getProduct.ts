import Product from '@/models/Product';
import logger from '@/utils/logger';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

export const getProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);

        if (!product) res.status(404).render('other/not-found', {title: 'Page Not Found'});

        res.render('shop/product', {
            path: ROUTES.shop,
            title: `Product ${product?.title}`,
            product
        });
    } catch (error) {
        logger.error(error, 'Error fetching product');
        res.status(500).render('other/not-found', {title: 'Failed to load product.'});
    }
};

export default getProduct;
