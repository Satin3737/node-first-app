import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';

const getReset: RequestHandler = async (_, res) => {
    try {
        res.render('auth/reset', {
            path: Routes.reset,
            title: 'Reset Password'
        });
    } catch (error) {
        logger.error(error, 'Error opening reset page');
        return res.status(500).render('other/not-found', {title: 'Failed to open reset page.'});
    }
};

export default getReset;
