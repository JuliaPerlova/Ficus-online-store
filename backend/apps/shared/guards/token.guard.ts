import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class TokenGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const token = context
            .switchToHttp()
            .getRequest()
            .get('x-auth-token');

        if (!token) {
            return false;
        }
        try {
            jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
            return true;
        } catch (error) {
                return false;
        }
    }
}
