import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import 'dotenv/config';

@Injectable()
export class MailService {
    private static transporter = createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.SENDER_EMAIL}`,
            pass: `${process.env.SENDER_PASSWORD}`,
        },
    });

    async confirmEmail(email: string, code: string) {
        return await MailService.transporter
            .sendMail({
                from: `${process.env.SENDER_EMAIL}`,
                to: email,
                subject: 'Verificate your email',
                html: `<h3>We are glad to see you in our community!</h3> 
            <p>Please enter this code ${code} to confirm your email. </p><br>
            <p>If you didnt sign up, then please ignore this message.</p>`,
            })
            .then(() => console.log('success'))
            .catch(err => console.log(err));
    }

    async forgotPassEmail(email: string, code: string) {
        return await MailService.transporter
            .sendMail({
                from: `${process.env.SENDER_EMAIL}`,
                to: email,
                subject: 'Forgot your password?',
                html: `<h3>We are sorry to hear you forgot your password</h3> 
                <p>Please enter this code ${code} to renew your password. </p><br>
                <p>If you didn't send requst to restore your passport, then please contact our support.</p>`,
            })
            .then(() => console.log('success'))
            .catch(err => console.log(err));
    }
}
