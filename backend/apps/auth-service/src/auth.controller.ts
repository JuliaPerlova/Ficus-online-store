import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from 'apps/user-service/src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly appService: AuthService) {}

    @MessagePattern({ cmd: 'login' })
    login({ email, password }) {
        return this.appService.signIn({ email, password });
    }

    @MessagePattern({ cmd: 'sign up' })
    signUp(data: CreateUserDto) {
        return this.appService.signUp(data);
    }

    @MessagePattern({ cmd: 'get confirmation' })
    getEmailVerification(email: string) {
        console.log(email);
        return this.appService.getEmailVerification(email);
    }

    @MessagePattern({ cmd: 'confirm email' })
    verificateEmail({ id, code }) {
        return this.appService.confirmEmail(id, code);
    }

    @MessagePattern({ cmd: 'check code' })
    checkCode({ id, code }) {
        return this.appService.checkCode(id, code);
    }

    @MessagePattern({ cmd: 'forgot password' })
    forgotPass(email: string) {
        return this.appService.forgotPass(email);
    }

    @MessagePattern({ cmd: 'change password' })
    changePass({ id, password }) {
        return this.appService.changePass(id, password);
    }

    @MessagePattern({ cmd: 'refresh token' })
    refreshToken(token: string) {
        return this.appService.generateRefreshToken(token);
    }

    @MessagePattern({ cmd: 'logout' })
    logout(token: string) {
        return this.appService.logout(token);
    }

    @MessagePattern({ cmd: 'delete profile' })
    deleteProfile({ id, token }) {
        return this.appService.deleteProfile(id, token);
    }
}
