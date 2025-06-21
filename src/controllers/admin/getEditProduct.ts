import {RequestHandler} from 'express';
import {ROUTES} from '@/enum';

const getEditProduct: RequestHandler = async (req, res) => {
    try {
        const id = req.params.productId;
        const user = req.user;
        if (!user) return res.status(404).render('other/not-found', {title: 'User not found'});

        const product = await user.getProducts({where: {id}});
        if (!product.length) return res.redirect(ROUTES.adminProducts);

        res.render('admin/manage-product', {
            path: '/admin/edit-product',
            title: 'Edit Product',
            editing: true,
            product: product[0]
        });
    } catch (error) {
        console.error('Error in getEditProduct:', error);
        res.status(500).render('other/not-found', {title: 'Error fetching product for editing'});
    }
};

export default getEditProduct;
