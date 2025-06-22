import db from '@/database/db';
import {ObjectId} from 'mongodb';
import {COLLECTIONS} from '@/enum';

interface IProduct {
    title: string;
    imageUrl: string;
    description: string;
    price: number;
}

class Product implements IProduct {
    declare title: string;
    declare imageUrl: string;
    declare description: string;
    declare price: number;

    constructor({title, price, imageUrl, description}: IProduct) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    static getId(id: string) {
        if (!ObjectId.isValid(id)) throw new Error('Invalid ID format');
        return new ObjectId(id);
    }

    static create(product: Product) {
        return db.collection<Product>(COLLECTIONS.products).insertOne(product);
    }

    static update(id: string, productData: Partial<Product>) {
        return db.collection<Product>(COLLECTIONS.products).updateOne({_id: this.getId(id)}, {$set: productData});
    }

    static delete(id: string) {
        return db.collection<Product>(COLLECTIONS.products).deleteOne({_id: this.getId(id)});
    }

    static findAll() {
        return db.collection<Product>(COLLECTIONS.products).find().toArray();
    }

    static findById(id: string) {
        return db.collection<Product>(COLLECTIONS.products).findOne({_id: this.getId(id)});
    }
}

export default Product;
