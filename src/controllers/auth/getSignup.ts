import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';

const getSignup: RequestHandler = async (_, res) => {
    try {
        res.render('auth/signup', {
            path: Routes.signup,
            title: 'Signup'
        });
    } catch (error) {
        logger.error(error, 'Error opening signup page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default getSignup;
