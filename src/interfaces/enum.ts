import type {IValueOf} from '@/interfaces';

export const Routes = {
    shop: '/',
    login: '/login',
    signup: '/signup',
    logout: '/logout',
    reset: '/reset',
    newPassword: '/new-password',
    product: '/product/:productId',
    cart: '/cart',
    removeFromCart: '/cart/remove',
    createOrder: '/create-order',
    orders: '/orders',
    addProduct: '/admin/add-product',
    editProduct: '/admin/edit-product',
    editProductById: '/admin/edit-product/:productId',
    deleteProduct: '/admin/delete-product',
    adminProducts: '/admin/products'
} as const;

export type IRoute = IValueOf<typeof Routes>;

export const Models = {
    user: 'User',
    product: 'Product',
    order: 'Order'
} as const;

export type IModels = IValueOf<typeof Models>;

export const ProtectedRoutes = [
    Routes.cart,
    Routes.removeFromCart,
    Routes.createOrder,
    Routes.orders,
    Routes.addProduct,
    Routes.editProduct,
    Routes.editProductById,
    Routes.deleteProduct,
    Routes.adminProducts
] as string[];
