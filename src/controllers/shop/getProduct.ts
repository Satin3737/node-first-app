import Product from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

export const getProduct: RequestHandler = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findByPk(productId);

        if (!product) res.status(404).render('other/not-found', {title: 'Page Not Found'});

        res.render('shop/product', {
            path: ROUTES.shop,
            title: `Product ${product?.title}`,
            product
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).render('other/not-found', {title: 'Failed to load product.'});
    }
};

export default getProduct;
