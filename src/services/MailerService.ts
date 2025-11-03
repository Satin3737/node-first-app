import nodemailer, {type Transporter} from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import type {Options, SentMessageInfo} from 'nodemailer/lib/smtp-transport';
import {logger} from '@/utils';

class MailerService {
    private readonly sender: string;
    private readonly config: mg.Options;
    public readonly client: Transporter<SentMessageInfo, Options>;

    constructor() {
        const api_key = process.env.MAILGUN_API_KEY;
        const domain = process.env.MAILGUN_DOMAIN;
        if (!api_key || !domain) throw new Error('Environment variables for Mailgun are not set up.');

        this.sender = 'shop@node-test.com';
        this.config = {auth: {api_key, domain}};
        this.client = nodemailer.createTransport(mg(this.config));
    }

    public sendMail({to, html}: {to: string; html: string}): Promise<SentMessageInfo> | void {
        try {
            return this.client.sendMail({from: this.sender, to, html});
        } catch (error) {
            logger.error(error, 'Error sending email');
        }
    }
}

export default new MailerService();
