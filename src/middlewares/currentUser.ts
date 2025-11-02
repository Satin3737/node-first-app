import type {RequestHandler} from 'express';
import {User} from '@/models';

const currentUser: RequestHandler = async (req, _, next) => {
    const user = await User.findById(req.session.userId);
    if (user) req.user = user;
    next();
};

export default currentUser;
