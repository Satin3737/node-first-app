import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {ProductsPerPage} from '@/const';
import {logger} from '@/utils';
import {Product} from '@/models';

const getShop: RequestHandler = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / ProductsPerPage);

        const products = await Product.find()
            .skip((page - 1) * ProductsPerPage)
            .limit(ProductsPerPage)
            .lean();

        res.render('shop/products', {
            path: Routes.shop,
            title: 'Shop',
            products,
            page,
            totalPages
        });
    } catch (error) {
        logger.error(error, 'Error fetching products');
        res.status(500).render('other/not-found', {title: 'Failed to load products.'});
    }
};

export default getShop;
