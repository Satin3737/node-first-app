import {Router} from 'express';
import {Routes} from '@/interfaces';
import {deleteProduct, getAddProduct, getAdminProducts, getEditProduct, postProduct} from '@/controllers/admin';

const adminRouter = Router();

adminRouter.get(Routes.addProduct, getAddProduct);
adminRouter.post(Routes.addProduct, postProduct);
adminRouter.get(Routes.editProductById, getEditProduct);
adminRouter.post(Routes.editProduct, postProduct);
adminRouter.get(Routes.adminProducts, getAdminProducts);
adminRouter.post(Routes.deleteProduct, deleteProduct);

export default adminRouter;
