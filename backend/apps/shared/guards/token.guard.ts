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
        const response = context.switchToHttp().getResponse();

        if (!token) {
            return response.status(401).json('Access denied, token is missing');
        }
        try {
            jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return response
                    .status(401)
                    .json('Session timed out,please login again');
            } else if (error.name === 'JsonWebTokenError') {
                return response
                    .status(401)
                    .json('Invalid token,please login again!');
            } else {
                return response.status(401).json(error);
            }
        }
    }
}
