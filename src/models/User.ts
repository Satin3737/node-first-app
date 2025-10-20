import {Schema, model} from 'mongoose';
import {Models} from '@/interfaces';

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
});

const User = model(Models.user, userSchema);

export default User;
