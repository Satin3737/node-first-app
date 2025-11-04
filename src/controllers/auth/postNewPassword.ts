import bcrypt from 'bcryptjs';
import type {RequestHandler} from 'express';
import {z} from 'zod';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {PostNewPasswordRequestSchema} from '@/schemas';
import {User} from '@/models';

const postNewPassword: RequestHandler = async (req, res) => {
    try {
        const {success, data, error} = PostNewPasswordRequestSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).render('other/not-found', {
                title: 'Invalid auth data:',
                error: z.prettifyError(error)
            });
        }

        const {password, userId, token} = data;

        const user = await User.findOne({_id: userId, resetToken: token, resetTokenExpiration: {$gt: new Date()}});
        if (!user) return res.redirect(Routes.reset);

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();

        res.redirect(Routes.login);
    } catch (error) {
        logger.error(error, 'Error opening signup page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default postNewPassword;
