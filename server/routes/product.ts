import {Router} from 'express';
import {ROUTES} from '@/enum';

const productRouter = Router();

type ITitle = string | undefined;

interface IProduct {
    title: ITitle;
}

export const PRODUCTS: IProduct[] = [];

productRouter.get(ROUTES.addProduct, (_, res) => {
    res.render('addProduct', {
        title: 'Add Product',
        isAddProductPage: true,
        isFormStyles: true,
        isProductStyles: true
    });
});

productRouter.post(ROUTES.product, (req, res) => {
    const title: ITitle = req?.body?.title;
    !!title && PRODUCTS.push({title});
    res.redirect(ROUTES.shop);
});

export default productRouter;
