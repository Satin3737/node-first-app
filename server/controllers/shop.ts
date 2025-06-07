import {IProduct, Product} from '@/models/Product';
import {RequestHandler} from 'express';

export const getShop: RequestHandler = (_, res) => {
    Product.fetchAll((products: IProduct[]) => {
        res.render('shop', {
            title: 'Shop',
            products: products,
            hasProducts: products?.length,
            isShopPage: true,
            isFormStyles: true
        });
    });
};
