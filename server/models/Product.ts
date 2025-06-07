import fs from 'fs';
import path from 'path';
import {DATA_DIR} from '@/const';

export interface IProduct {
    title: string;
}

export class Product implements IProduct {
    private static readonly filePath: string = path.join(DATA_DIR, 'products.json');
    public title: string;

    constructor(title: string) {
        this.title = title;
    }

    save(): void {
        Product.fetchAll((products: IProduct[]) => {
            const productsData: IProduct[] = products || [];
            productsData.push(this);

            fs.writeFile(Product.filePath, JSON.stringify(productsData), writeErr => {
                if (writeErr) throw writeErr;
            });
        });
    }

    static fetchAll(cb: Function) {
        fs.readFile(Product.filePath, (_, data) => {
            try {
                const parsedData: IProduct[] = !!data?.length ? JSON.parse(data.toString()) : [];
                cb(parsedData);
            } catch (error) {
                console.error('Error reading products file:', error);
                cb([]);
            }
        });
    }
}
