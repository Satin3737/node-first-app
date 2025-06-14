import {Router} from 'express';
import {ROUTES} from '@/enum';
import {deleteProduct, getAddProduct, getAdminProducts, getEditProduct, postProduct} from '@/controllers/admin';

const adminRouter = Router();

adminRouter.get(ROUTES.addProduct, getAddProduct);
adminRouter.post(ROUTES.addProduct, postProduct);
adminRouter.get(ROUTES.editProductById, getEditProduct);
adminRouter.post(ROUTES.editProduct, postProduct);
adminRouter.get(ROUTES.adminProducts, getAdminProducts);
adminRouter.post(ROUTES.deleteProduct, deleteProduct);

export default adminRouter;
