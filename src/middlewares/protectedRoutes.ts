import type {RequestHandler} from 'express';
import {ProtectedRoutes, Routes} from '@/interfaces';

const protectedRoutes: RequestHandler = async (req, res, next) => {
    if (!req.session.userId && ProtectedRoutes.includes(req.url)) return res.redirect(Routes.login);
    next();
};

export default protectedRoutes;
