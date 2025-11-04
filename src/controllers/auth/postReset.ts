import crypto from 'crypto';
import type {RequestHandler} from 'express';
import {z} from 'zod';
import {Routes} from '@/interfaces';
import {BaseUrlWithPort, ResetPasswordEmailTemplate} from '@/const';
import {logger} from '@/utils';
import {MailerService} from '@/services';
import {PostResetRequestSchema} from '@/schemas';
import {User} from '@/models';

const postReset: RequestHandler = async (req, res) => {
    try {
        const {success, data, error} = PostResetRequestSchema.safeParse(req.body);

        if (!success) {
            return res.status(400).render('other/not-found', {
                title: 'Invalid auth data:',
                error: z.prettifyError(error)
            });
        }

        const {email} = data;

        const user = await User.findOne({email});
        if (!user) return res.status(400).render('other/not-found', {title: 'Invalid email'});

        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                logger.error(err, 'Error generating reset token');
                return res.status(500).render('other/not-found', {title: 'Failed to process reset request.'});
            }

            const token = buffer.toString('hex');

            user.resetToken = token;
            user.resetTokenExpiration = new Date(Date.now() + 3600000);
            await user.save();

            MailerService.sendMail({
                to: email,
                subject: 'Password Reset',
                html: ResetPasswordEmailTemplate(`${BaseUrlWithPort}${Routes.newPassword}?token=${token}`)
            });
        });

        return res.redirect(Routes.login);
    } catch (error) {
        logger.error(error, 'Error opening login page');
        return res.status(500).render('other/not-found', {title: 'Failed to fetch orders.'});
    }
};

export default postReset;
