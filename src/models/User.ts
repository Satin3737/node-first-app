import {ObjectId} from 'mongodb';
import db from '@/database/db';
import {Collections, IId} from '@/interfaces';
import {getId} from '@/utils';

interface IUser {
    _id?: IId;
    username: string;
    email: string;
}

class User implements IUser {
    declare public _id: ObjectId;
    declare public username: string;
    declare public email: string;

    constructor({_id, username, email}: IUser) {
        this._id = _id ? (_id instanceof ObjectId ? _id : getId(_id)) : new ObjectId();
        this.username = username;
        this.email = email;
    }

    public async create() {
        const result = await db.collection<User>(Collections.users).insertOne(this);
        this._id = result.insertedId;
        return result;
    }

    public static async findById(_id: ObjectId) {
        const user = await db.collection<User>(Collections.users).findOne({_id});
        return user ? new User(user) : null;
    }
}

export default User;
