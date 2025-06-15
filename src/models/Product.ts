import {Cart} from '@/models/Cart';
import fs from 'fs';
import path from 'path';
import {DATA_DIR} from '@/const';
import {generateRandomId} from '@/helper';

interface IProduct {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    quantity: number;
}

export class Product implements IProduct {
    public id: string;
    public title: string;
    public imageUrl: string;
    public description: string;
    public price: number;
    public quantity: number;

    constructor(data: IProduct) {
        this.id = data?.id ?? generateRandomId();
        this.title = data?.title ?? '';
        this.imageUrl = data?.imageUrl ?? '';
        this.description = data?.description ?? '';
        this.price = data?.price ?? 0;
        this.quantity = data?.quantity ?? 1;
    }

    private static readonly filePath: string = path.join(DATA_DIR, 'products.json');

    public save(isEditing: boolean = false): void {
        Product.fetchAll((products: Product[]) => {
            const productsData: Product[] = products || [];

            if (isEditing) {
                const productIndex = productsData.findIndex(prod => prod.id === this.id);
                if (productIndex === -1) return;
                productsData[productIndex] = Product.fromObject(this);
            } else {
                productsData.push(this);
            }

            fs.writeFile(Product.filePath, JSON.stringify(productsData), writeErr => {
                if (writeErr) throw writeErr;
            });
        });
    }

    public delete(): void {
        Product.fetchAll((products: Product[]) => {
            const updatedProducts = products.filter(prod => prod.id !== this.id);
            Cart.removeFromCart(this.id);

            fs.writeFile(Product.filePath, JSON.stringify(updatedProducts), writeErr => {
                if (writeErr) throw writeErr;
            });
        });
    }

    public static fetchAll(cb: (products: Product[]) => void) {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, {recursive: true});

        fs.readFile(Product.filePath, (_, data) => {
            try {
                const parsedData = data?.length ? JSON.parse(data.toString()) : undefined;
                cb(parsedData?.map((product: Partial<Product>) => Product.fromObject(product)) ?? []);
            } catch (error) {
                console.error('Error reading products file:', error);
                cb([]);
            }
        });
    }

    public static fetchById(id: string, cb: (product: Product) => void) {
        Product.fetchAll((products: Product[]) => {
            const product = products.find(prod => prod.id === id);
            !!product && cb(product);
        });
    }

    public static fromJson(data: string): Product {
        const rawData = data ? JSON.parse(data) : {};

        return new Product({
            id: rawData?.id ?? generateRandomId(),
            title: rawData?.title ?? '',
            imageUrl: rawData?.imageUrl ?? '',
            description: rawData?.description ?? '',
            price: Number(rawData?.price) || 0,
            quantity: Number(rawData?.quantity) || 1
        });
    }

    public static fromObject(data: Partial<Product>): Product {
        return new Product({
            id: data?.['id'] ?? generateRandomId(),
            title: data?.['title'] ?? '',
            imageUrl: data?.['imageUrl'] ?? '',
            description: data?.['description'] ?? '',
            price: Number(data?.['price']) || 0,
            quantity: Number(data?.['quantity']) || 1
        });
    }

    public copyWith(data?: Partial<Product>): Product {
        return new Product({
            id: data?.id ?? this.id,
            title: data?.title ?? this.title,
            imageUrl: data?.imageUrl ?? this.imageUrl,
            description: data?.description ?? this.description,
            price: data?.price ?? this.price,
            quantity: data?.quantity ?? this.quantity
        });
    }
}
