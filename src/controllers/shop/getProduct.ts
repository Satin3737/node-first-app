import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

export const getProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);

        if (!product) res.status(404).render('other/not-found', {title: 'Page Not Found'});

        res.render('shop/product', {
            path: Routes.shop,
            title: `Product ${product?.title}`,
            product
        });
    } catch (error) {
        logger.error(error, 'Error fetching product');
        res.status(500).render('other/not-found', {title: 'Failed to load product.'});
    }
};

export default getProduct;
