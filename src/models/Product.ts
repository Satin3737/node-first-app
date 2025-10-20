import {Schema, model} from 'mongoose';
import {Models} from '@/interfaces';

const productSchema = new Schema({
    title: {type: String, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    userId: {type: Schema.Types.ObjectId, ref: Models.user, required: true}
});

const Product = model(Models.product, productSchema);

export default Product;
