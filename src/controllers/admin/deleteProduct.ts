import {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product} from '@/models';

const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.body.id;
        await Product.findByIdAndDelete(id);
        res.redirect(Routes.adminProducts);
    } catch (error) {
        logger.error(error, 'Error deleting product');
        res.status(500).render('other/not-found', {title: 'Error deleting product'});
    }
};

export default deleteProduct;
