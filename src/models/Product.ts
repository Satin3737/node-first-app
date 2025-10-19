import {ObjectId} from 'mongodb';
import db from '@/database/db';
import {Collections, IId} from '@/interfaces';
import {getId} from '@/utils';
import {Cart} from '@/models';

interface IProduct {
    _id?: IId;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    userId: ObjectId;
}

class Product implements IProduct {
    declare public _id: ObjectId;
    declare public title: string;
    declare public imageUrl: string;
    declare public description: string;
    declare public price: number;
    declare public userId: ObjectId;

    constructor({_id, title, price, imageUrl, description, userId}: IProduct) {
        this._id = _id ? (_id instanceof ObjectId ? _id : getId(_id)) : new ObjectId();
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.userId = userId;
    }

    public async create() {
        const result = await db.collection<Product>(Collections.products).insertOne(this);
        this._id = result.insertedId;
        return result;
    }

    public static async update(id: string, productData: Partial<Product>) {
        const {_id, ...$set} = productData;
        return await db.collection<Product>(Collections.products).updateOne({_id: getId(id)}, {$set});
    }

    public static async delete(id: string) {
        const _id = getId(id);

        const result = await db.collection<Product>(Collections.products).deleteOne({_id});

        if (result.acknowledged) {
            await db.collection<Cart>(Collections.carts).updateMany(
                {},
                {
                    $pull: {
                        products: {
                            ['product._id' as string]: _id
                        }
                    }
                }
            );

            const carts = await Cart.findAll();
            for (const cart of carts) await cart.recalculateTotal();
        }

        return result;
    }

    public static async findAll(): Promise<Product[]> {
        const productsData = await db.collection<Product>(Collections.products).find().toArray();
        return productsData.map(product => new Product(product));
    }

    public static async findById(id: string): Promise<Product | null> {
        const product = await db.collection<Product>(Collections.products).findOne({_id: getId(id)});
        return product ? new Product(product) : null;
    }
}

export default Product;
