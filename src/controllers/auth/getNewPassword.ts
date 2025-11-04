import type {RequestHandler} from 'express';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {User} from '@/models';

const getNewPassword: RequestHandler = async (_, res) => {
    try {
        const token = res.req.query.token;
        if (!token) return res.redirect(Routes.login);

        const user = await User.findOne({resetToken: token, resetTokenExpiration: {$gt: new Date()}});
        if (!user) return res.redirect(Routes.login);

        res.render('auth/new-password', {
            path: Routes.newPassword,
            title: 'New Password',
            userId: user._id.toString(),
            token
        });
    } catch (error) {
        logger.error(error, 'Error opening new password page');
        return res.status(500).render('other/not-found', {title: 'Failed to open new password page.'});
    }
};

export default getNewPassword;
