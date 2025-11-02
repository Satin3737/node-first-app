import bcrypt from 'bcryptjs';
import type {RequestHandler} from 'express';
import {z} from 'zod';
import {Routes} from '@/interfaces';
import {logger} from '@/utils';
import {PostLoginRequestSchema} from '@/schemas';
import {User} from '@/models';

const postLogin: RequestHandler = async (req, res) => {
    try {
        const {success, data, error} = PostLoginRequestSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).render('other/not-found', {
                title: 'Invalid auth data:',
                error: z.prettifyError(error)
            });
        }

        const {email, password} = data;

        const user = await User.findOne({email});
        if (!user) return res.status(400).render('other/not-found', {title: 'Invalid email'});

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).render('other/not-found', {title: 'Invalid password'});

        req.session.userId = user._id;
        res.redirect(Routes.shop);
    } catch (error) {
        logger.error(error, 'Error opening login page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default postLogin;
