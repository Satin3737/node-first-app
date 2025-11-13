import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {ProductsPerPage} from '@/const';
import {logger} from '@/utils';
import {Product} from '@/models';

const getAdminProducts: RequestHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(400).render('other/not-found', {title: 'User not found'});

        const page = Number(req.query.page) || 1;
        const totalProducts = await Product.countDocuments({user});
        const totalPages = Math.ceil(totalProducts / ProductsPerPage);

        const products = await Product.find({user})
            .skip((page - 1) * ProductsPerPage)
            .limit(ProductsPerPage)
            .lean();

        res.render('admin/products', {
            path: Routes.adminProducts,
            title: 'Products',
            products,
            page,
            totalPages
        });
    } catch (error) {
        logger.error(error, 'Error in getAdminProducts');
        res.status(500).render('other/not-found', {title: 'Error fetching products'});
    }
};

export default getAdminProducts;
