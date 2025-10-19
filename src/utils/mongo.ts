import {ObjectId} from 'mongodb';

export const getId = (id: string): ObjectId => {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ID format');
    return new ObjectId(id);
};
