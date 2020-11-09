import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class UserGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const token = request.get('x-auth-token');
        const uId = request.params.uId;

        if (!token) {
            return response.status(401).json('Access denied, token is missing');
        }
        try {
            const payload: any = jwt.verify(
                token,
                `${process.env.ACCESS_TOKEN_SECRET}`,
            );
            console.log(payload);
            console.log(uId);
            if (payload.user._id) {
                return payload.user._id !== uId ? false : true;
            }
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
