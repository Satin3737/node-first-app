import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';

const getLogin: RequestHandler = async (_, res) => {
    try {
        res.render('auth/login', {
            path: Routes.login,
            title: 'Login'
        });
    } catch (error) {
        logger.error(error, 'Error opening login page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default getLogin;
