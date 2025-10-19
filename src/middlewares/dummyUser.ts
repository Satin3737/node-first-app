import {RequestHandler} from 'express';
import {getId} from '@/utils';
import {User} from '@/models';

const dummyUser: RequestHandler = async (req, _, next) => {
    // Middleware to attach a dummy user to the request object
    const dummy = await User.findById(getId('685c56e1bc57f746ae36157f'));
    if (dummy) req.user = new User(dummy);
    next();
};

export default dummyUser;
