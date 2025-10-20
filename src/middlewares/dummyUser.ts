import {RequestHandler} from 'express';
import {User} from '@/models';

const dummyUser: RequestHandler = async (req, _, next) => {
    // Middleware to attach a dummy user to the request object
    const dummy = await User.findById('68f69c492f9b6917af890e79');
    if (dummy) req.user = dummy;
    next();
};

export default dummyUser;
