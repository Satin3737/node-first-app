export enum ROUTES {
    shop = '/',
    product = '/product/:productId',
    cart = '/cart',
    removeFromCart = '/cart/remove',
    orders = '/orders',
    checkout = '/checkout',
    addProduct = '/admin/add-product',
    editProduct = '/admin/edit-product',
    editProductById = '/admin/edit-product/:productId',
    deleteProduct = '/admin/delete-product',
    adminProducts = '/admin/products'
}
