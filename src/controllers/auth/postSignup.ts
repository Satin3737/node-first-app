import bcrypt from 'bcryptjs';
import type {RequestHandler} from 'express';
import {z} from 'zod';
import {Routes} from '@/interfaces';
import {SignupEmailTemplate} from '@/const';
import {logger} from '@/utils';
import {MailerService} from '@/services';
import {PostSignupRequestSchema} from '@/schemas';
import {User} from '@/models';

const postSignup: RequestHandler = async (req, res) => {
    try {
        const {success, data, error} = PostSignupRequestSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).render('other/not-found', {
                title: 'Invalid auth data:',
                error: z.prettifyError(error)
            });
        }

        const {name, email, password} = data;

        const currentUser = await User.findOne({email});
        if (currentUser) return res.redirect(Routes.signup);

        const hash = await bcrypt.hash(password, 10);

        const user = new User({name, email, password: hash});
        await user.save();

        void MailerService.sendMail({to: email, html: SignupEmailTemplate(name)});

        res.redirect(Routes.login);
    } catch (error) {
        logger.error(error, 'Error opening signup page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default postSignup;
