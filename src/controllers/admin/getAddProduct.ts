import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';

const getAddProduct: RequestHandler = (_, res) => {
    res.render('admin/manage-product', {
        path: Routes.addProduct,
        title: 'Add Product',
        editing: false
    });
};

export default getAddProduct;
