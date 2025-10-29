import {Document, Schema, model} from 'mongoose';
import {Models} from '@/interfaces';
import type {IProduct} from '@/models';

export interface IUser extends Document<Schema.Types.ObjectId> {
    name: string;
    email: string;
    cart: {
        items: {
            product: Schema.Types.ObjectId;
            quantity: number;
        }[];
    };
    addToCart(product: IProduct): Promise<IUser>;
    removeFromCart(product: IProduct): Promise<IUser> | void;
    clearCart(): Promise<IUser>;
}

const cartItemSchema = new Schema<IUser['cart']>(
    {
        items: [
            {
                product: {type: Schema.Types.ObjectId, ref: Models.product, required: true},
                quantity: {type: Number, required: true}
            }
        ]
    },
    {_id: false}
);

const userSchema = new Schema<IUser>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true},
        cart: {type: cartItemSchema, required: true, default: {items: []}}
    },
    {
        methods: {
            addToCart(product: IProduct): Promise<IUser> {
                const existingProductIndex = this.cart.items.findIndex(item => {
                    return item.product.toString() === product._id.toString();
                });

                if (existingProductIndex > -1) {
                    this.cart.items[existingProductIndex].quantity += 1;
                } else {
                    this.cart.items.push({product: product._id, quantity: 1});
                }

                return this.save();
            },
            removeFromCart(product: IProduct): Promise<IUser> | void {
                const existingProduct = this.cart.items.find(
                    item => item.product.toString() === product._id.toString()
                );
                if (!existingProduct) return;

                this.cart.items = this.cart.items.filter(item => item.product.toString() !== product._id.toString());

                return this.save();
            },
            clearCart(): Promise<IUser> {
                this.cart.items = [];
                return this.save();
            }
        }
    }
);

const User = model<IUser>(Models.user, userSchema);

export default User;
