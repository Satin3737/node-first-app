import {Document, Schema, model} from 'mongoose';
import {Models} from '@/interfaces';
import type {IProduct} from '@/models';

export interface IOrder extends Document<Schema.Types.ObjectId> {
    user: Schema.Types.ObjectId;
    products: {
        product: IProduct;
        quantity: number;
    }[];
}

const orderSchema = new Schema<IOrder>({
    user: {type: Schema.Types.ObjectId, ref: Models.user, required: true},
    products: [
        {
            product: {type: Object, required: true},
            quantity: {type: Number, required: true}
        }
    ]
});

const Order = model<IOrder>(Models.order, orderSchema);

export default Order;
