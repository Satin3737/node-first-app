import type {RequestHandler} from 'express';
import {User} from '@/models';

const dummyUser: RequestHandler = async (req, _, next) => {
    // Middleware to attach a dummy user to the request object
    const dummy = await User.findOne();

    if (dummy) req.user = dummy;
    next();
};

export default dummyUser;
