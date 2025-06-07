import {Product} from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

export const getAddProduct: RequestHandler = (_, res) => {
    res.render('addProduct', {
        title: 'Add Product',
        isAddProductPage: true,
        isFormStyles: true,
        isProductStyles: true
    });
};

export const postAddProduct: RequestHandler = (req, res) => {
    const title: string = req?.body?.title;
    !!title && new Product(title).save();
    res.redirect(ROUTES.shop);
};
