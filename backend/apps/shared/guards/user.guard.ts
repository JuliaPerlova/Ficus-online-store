import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

@Injectable()
export class UserGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.get('x-auth-token');
        const uId = request.params.uId;

        if (!token) {
            return false;
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
            return false;
        }
    }
}
