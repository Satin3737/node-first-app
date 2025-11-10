import {Router} from 'express';
import {Routes} from '@/interfaces';
import {imageUpload} from '@/middlewares';
import {deleteProduct, getAddProduct, getAdminProducts, getEditProduct, postProduct} from '@/controllers/admin';

const adminRouter = Router();

adminRouter.get(Routes.addProduct, getAddProduct);
adminRouter.post(Routes.addProduct, imageUpload.single('image'), postProduct);
adminRouter.get(Routes.editProductById, getEditProduct);
adminRouter.post(Routes.editProduct, imageUpload.single('image'), postProduct);
adminRouter.get(Routes.adminProducts, getAdminProducts);
adminRouter.post(Routes.deleteProduct, deleteProduct);

export default adminRouter;
