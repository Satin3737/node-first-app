import {RequestHandler} from 'express';

const getAddProduct: RequestHandler = (_, res) => {
    res.render('admin/manage-product', {
        path: '/admin/add-product',
        title: 'Add Product',
        editing: false
    });
};

export default getAddProduct;
