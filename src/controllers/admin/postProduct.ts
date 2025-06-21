import Product from '@/models/Product';
import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const postProduct: RequestHandler = async (req, res) => {
    try {
        const data = req?.body;

        if (!data || !data.title || !data.imageUrl || !data.description || !data.price) {
            res.status(400).send('Invalid product data');
            return;
        }

        if (data.id) {
            const product = await Product.findByPk(data.id);

            if (!product) {
                res.status(404).send('Product not found');
                return;
            }

            await product.update({
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
                price: parseFloat(data.price)
            });
        } else {
            const user = req.user;
            if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

            await user.createProduct({
                title: data.title,
                imageUrl: data.imageUrl,
                description: data.description,
                price: parseFloat(data.price)
            });
        }

        res.redirect(ROUTES.adminProducts);
    } catch (error) {
        console.error('Error in postProduct:', error);
        res.status(500).render('other/not-found', {title: 'Error creating product'});
    }
};

export default postProduct;
