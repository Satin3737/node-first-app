import {IValueOf} from '@/interfaces';

export const Routes = {
    shop: '/',
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

export const Collections = {
    users: 'users',
    products: 'products',
    carts: 'carts',
    orders: 'orders'
} as const;

export type ICollection = IValueOf<typeof Collections>;
