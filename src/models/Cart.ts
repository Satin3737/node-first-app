import {ObjectId} from 'mongodb';
import db from '@/database/db';
import {Collections, IId} from '@/interfaces';
import {getId} from '@/utils';
import {Product} from '@/models';

interface ICart {
    _id?: IId;
    userId: ObjectId;
    products: {productId: ObjectId; quantity: number}[];
}

class Cart implements ICart {
    declare public _id: ObjectId;
    declare public readonly userId: ObjectId;
    declare public products: {productId: ObjectId; quantity: number}[];

    constructor({_id, userId, products}: ICart) {
        this._id = _id ? (_id instanceof ObjectId ? _id : getId(_id)) : new ObjectId();
        this.userId = userId;
        this.products = products;
    }

    public async create() {
        const result = await db.collection<Cart>(Collections.carts).insertOne(this);
        this._id = result.insertedId;
        return result;
    }

    public addToCart(product: Product) {
        const existingProductIndex = this.products.findIndex(item => {
            return item.productId.toString() === product._id.toString();
        });

        if (existingProductIndex > -1) {
            this.products[existingProductIndex].quantity += 1;
        } else {
            this.products.push({productId: product._id, quantity: 1});
        }

        return this.updateCart();
    }

    public removeFromCart(product: Product) {
        const existingProduct = this.products.find(item => item.productId.toString() === product._id.toString());
        if (!existingProduct) return;

        this.products = this.products.filter(item => item.productId.toString() !== product._id.toString());
        return this.updateCart();
    }

    public static async findByUserId(userId: ObjectId) {
        const cart = await db.collection<Cart>(Collections.carts).findOne({userId});
        return cart ? new Cart(cart) : null;
    }

    public static async findAll(): Promise<Cart[]> {
        const cartsData = await db.collection<Cart>(Collections.carts).find().toArray();
        return cartsData.map(cart => new Cart(cart));
    }

    public async clearCart() {
        this.products = [];
        return await this.updateCart();
    }

    private async updateCart() {
        return await db
            .collection<Cart>(Collections.carts)
            .updateOne({userId: this.userId}, {$set: {products: this.products}}, {upsert: true});
    }
}

export default Cart;
