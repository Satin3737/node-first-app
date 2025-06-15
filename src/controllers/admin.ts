import {Product} from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

export const getAddProduct: RequestHandler = (_, res) => {
    res.render('admin/manage-product', {
        path: '/admin/add-product',
        title: 'Add Product',
        editing: false
    });
};

export const postProduct: RequestHandler = (req, res) => {
    const data: Product = req?.body;
    new Product(data).save(!!req?.body?.id);
    res.redirect(ROUTES.adminProducts);
};

export const getEditProduct: RequestHandler = (req, res) => {
    const productId = req.params.productId;
    Product.fetchById(productId, (product: Product) => {
        if (!product) return res.redirect(ROUTES.adminProducts);
        res.render('admin/manage-product', {
            path: '/admin/edit-product',
            title: 'Edit Product',
            editing: true,
            product
        });
    });
};

export const getAdminProducts: RequestHandler = (_, res) => {
    Product.fetchAll((products: Product[]) => {
        res.render('admin/products', {
            path: ROUTES.adminProducts,
            title: 'Products',
            products: products
        });
    });
};

export const deleteProduct: RequestHandler = (req, res) => {
    Product.fetchById(req?.body?.id, (product: Product) => {
        if (!product) return;
        product.delete();
        res.redirect(ROUTES.adminProducts);
    });
};
