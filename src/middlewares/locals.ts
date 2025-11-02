import type {RequestHandler} from 'express';

const locals: RequestHandler = async (req, res, next) => {
    res.locals.isLoggedIn = !!req.user;
    next();
};

export default locals;
