import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {Product, User} from '@/models';

const deleteProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.body.id;
        const product = await Product.findByIdAndDelete(id);

        if (product) {
            await User.updateMany({'cart.items.product': product._id}, {$pull: {'cart.items': {product: product._id}}});
        }

        res.redirect(Routes.adminProducts);
    } catch (error) {
        logger.error(error, 'Error deleting product');
        res.status(500).render('other/not-found', {title: 'Error deleting product'});
    }
};

export default deleteProduct;
