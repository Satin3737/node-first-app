import User from '@/models/User';
import {RequestHandler} from 'express';

const dummyUser: RequestHandler = async (req, _, next) => {
    // Middleware to attach a dummy user to the request object
    const dummy = await User.findByPk(1);
    if (dummy) req.user = dummy;
    next();
};

export default dummyUser;
