import {Product} from '@/models/Product';
import fs from 'fs';
import path from 'path';
import {DATA_DIR} from '@/const';

interface ICart {
    products: Product[];
    totalPrice: number;
}

export class Cart implements ICart {
    public products: Product[];
    public totalPrice: number;

    constructor({products, totalPrice}: ICart) {
        this.products = products ?? [];
        this.totalPrice = totalPrice ?? this.products.reduce((total, product) => total + product.price, 0);
    }

    private static readonly filePath: string = path.join(DATA_DIR, 'cart.json');

    public static addToCart(productId: string) {
        Product.fetchById(productId, (product: Product) => {
            if (!product) return;

            Cart.fetchCart((cart: Cart) => {
                const existingProduct = cart.products.find(prod => prod.id === productId);

                const newCart = cart.copyWith({
                    products: existingProduct
                        ? cart.products.map(prod =>
                              prod.id !== productId
                                  ? prod
                                  : existingProduct.copyWith({quantity: existingProduct.quantity + 1})
                          )
                        : [...cart.products, product],
                    totalPrice: cart.totalPrice + product.price
                });

                fs.writeFile(Cart.filePath, JSON.stringify(newCart), writeErr => {
                    if (writeErr) throw writeErr;
                });
            });
        });
    }

    public static removeFromCart(productId: string) {
        Cart.fetchCart((cart: Cart) => {
            const product = cart.products.find(prod => prod.id === productId);
            if (!product) return;

            const newCart = cart.copyWith({
                products: cart.products.filter(prod => prod.id !== product.id),
                totalPrice: cart.totalPrice - product.price * product.quantity
            });

            fs.writeFile(Cart.filePath, JSON.stringify(newCart), writeErr => {
                if (writeErr) throw writeErr;
            });
        });
    }

    static fetchCart(cb: (cart: Cart) => void) {
        fs.readFile(Cart.filePath, (_, data) => {
            try {
                cb(data?.length ? Cart.fromJson(data.toString()) : new Cart({products: [], totalPrice: 0}));
            } catch (error) {
                console.error('Error reading cart file:', error);
                cb(new Cart({products: [], totalPrice: 0}));
            }
        });
    }

    public static fromJson(data: string): Cart {
        const rawData = data ? JSON.parse(data) : {};

        return new Cart({
            products: rawData?.products?.map((product: Partial<Product>) => Product.fromObject(product)) ?? [],
            totalPrice: Number(rawData?.totalPrice) || 0
        });
    }

    public copyWith(data?: Partial<Cart>): Cart {
        return new Cart({
            products: data?.products ?? this.products,
            totalPrice: data?.totalPrice ?? this.totalPrice
        });
    }
}
