import {Document, Schema, model} from 'mongoose';
import {Models} from '@/interfaces';

export interface IProduct extends Document<Schema.Types.ObjectId> {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    user: Schema.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: Models.user, required: true}
});

const Product = model<IProduct>(Models.product, productSchema);

export default Product;
