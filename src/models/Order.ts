import {ObjectId} from 'mongodb';
import db from '@/database/db';
import {Collections, IId} from '@/interfaces';
import {getId} from '@/utils';

interface IOrder {
    _id?: IId;
    userId: ObjectId;
    products: {productId: ObjectId; quantity: number}[];
}

class Order implements IOrder {
    declare public _id: ObjectId;
    declare public readonly userId: ObjectId;
    declare public products: {productId: ObjectId; quantity: number}[];

    constructor({_id, userId, products}: IOrder) {
        this._id = _id ? (_id instanceof ObjectId ? _id : getId(_id)) : new ObjectId();
        this.userId = userId;
        this.products = products;
    }

    public async create() {
        const result = await db.collection<Order>(Collections.orders).insertOne(this);
        this._id = result.insertedId;
        return result;
    }

    public static async findByUserId(userId: ObjectId) {
        const orders = await db.collection<Order>(Collections.orders).find({userId}).toArray();
        return orders.map(order => new Order(order));
    }
}

export default Order;
