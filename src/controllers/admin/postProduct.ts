import Product from '@/models/Product';
import logger from '@/utils/logger';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const postProduct: RequestHandler = async (req, res) => {
    try {
        const {id, title, imageUrl, description, price} = req.body;

        if (!title || !imageUrl || !description || !price) {
            return res.status(400).render('other/not-found', {title: 'All fields are required.'});
        }

        const product = new Product({title, imageUrl, description, price});
        id ? await Product.update(id, product) : await Product.create(product);

        res.redirect(ROUTES.adminProducts);
    } catch (error) {
        logger.error(error, 'Error in Error in postProduct');
        res.status(500).render('other/not-found', {title: 'Failed to save product.'});
    }
};

export default postProduct;
