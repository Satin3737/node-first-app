import {ObjectId} from 'mongodb';

export type IValueOf<T> = T[keyof T];

export type IId = string | ObjectId;
