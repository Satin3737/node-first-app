import Product from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.body.id;
        await Product.delete(id);
        res.redirect(ROUTES.adminProducts);
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).render('other/not-found', {title: 'Error deleting product'});
    }
};

export default deleteProduct;
