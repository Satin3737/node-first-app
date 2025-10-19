import {RequestHandler} from 'express';
import {z} from 'zod';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {PostProductRequestSchema} from '@/schemas';
import {Product} from '@/models';

const postProduct: RequestHandler = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) return res.status(401).render('other/not-found', {title: 'Unauthorized access.'});

        const {success, data, error} = PostProductRequestSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).render('other/not-found', {
                title: 'Invalid product data:',
                error: z.prettifyError(error)
            });
        }

        const {id, ...restData} = data;
        const product = new Product({...restData, userId});
        id ? await Product.update(id, product) : await product.create();

        res.redirect(Routes.adminProducts);
    } catch (error) {
        logger.error(error, 'Error in Error in postProduct');
        res.status(500).render('other/not-found', {title: 'Failed to save product.'});
    }
};

export default postProduct;
