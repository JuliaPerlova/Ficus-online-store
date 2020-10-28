import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import {
    ClientProxy,
    Transport,
    ClientProxyFactory,
} from '@nestjs/microservices';

import 'dotenv/config';

@Injectable()
export class AuthApiService {
    private authClient: ClientProxy;

    constructor() {
        this.authClient = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        });
    }

    async login(data: object) {
        return await this.authClient
            .send<object>({ cmd: 'login' }, data)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    signUp(data: object) {
        return this.authClient
            .send<object>({ cmd: 'sign up' }, data)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    refreshToken(token: string) {
        return this.authClient.send<object, string>(
            { cmd: 'refresh token' },
            token,
        );
    }

    forgotPass(email) {
        return this.authClient
            .send<object, string>({ cmd: 'forgot password' }, email)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    changePass(id: string, password: string) {
        return this.authClient
            .send<object>({ cmd: 'change password' }, { id, password })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    getEmailVerification(email: string) {
        return this.authClient.send<object, string>(
            { cmd: 'get confirmation' },
            email,
        );
    }

    confirmEmail(id: string, code: string) {
        return this.authClient.send<object>(
            { cmd: 'confirm email' },
            { id, code },
        );
    }

    checkCode(id: string, code: string) {
        return this.authClient.send<object>(
            { cmd: 'check code' },
            { id, code },
        );
    }

    logout(token: string) {
        return this.authClient.send<object>({ cmd: 'logout' }, token);
    }

    deleteUser(id: string, token: string) {
        return this.authClient.send<object>(
            { cmd: 'delete profile' },
            { id, token },
        );
    }
}
