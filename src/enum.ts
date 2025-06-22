export enum ROUTES {
    shop = '/',
    product = '/product/:productId',
    cart = '/cart',
    removeFromCart = '/cart/remove',
    createOrder = '/create-order',
    orders = '/orders',
    addProduct = '/admin/add-product',
    editProduct = '/admin/edit-product',
    editProductById = '/admin/edit-product/:productId',
    deleteProduct = '/admin/delete-product',
    adminProducts = '/admin/products'
}

export enum COLLECTIONS {
    users = 'users',
    products = 'products',
    carts = 'carts',
    orders = 'orders',
    cartItems = 'cart_items',
    orderItems = 'order_items'
}
