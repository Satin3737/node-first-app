import type {IProduct} from '@/models';

export type IValueOf<T> = T[keyof T];

export interface CartPopulated {
    cart: {
        items: {
            product: IProduct;
            quantity: number;
        }[];
    };
}
