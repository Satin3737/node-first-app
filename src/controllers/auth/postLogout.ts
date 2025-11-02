import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';

const postLogout: RequestHandler = async (req, res) => {
    try {
        req.session.destroy(err => {
            if (err) throw err;
        });

        res.redirect(Routes.login);
    } catch (error) {
        logger.error(error, 'Error opening login page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default postLogout;
