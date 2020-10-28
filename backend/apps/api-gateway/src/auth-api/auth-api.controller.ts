import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { AuthApiService } from './auth-api.service';

@Controller()
export class AuthApiController {
    constructor(private readonly appService: AuthApiService) {}

    @Post('/auth/login')
    login(@Body() data: object) {
        return this.appService.login(data);
    }

    @Post('/auth/sign-up')
    signUp(@Body() data: object) {
        return this.appService.signUp(data);
    }

    @Get('/auth/token/:token')
    refreshToken(@Param() { token }) {
        return this.appService.refreshToken(token);
    }

    @Post('/auth/get-confirm')
    getConfirmation(@Body() email: string) {
        return this.appService.getEmailVerification(email);
    }

    @Post('/auth/confirm/:id')
    confirmEmail(@Param() { id }, @Body() { code }) {
        return this.appService.confirmEmail(id, code);
    }

    @Post('/auth/check/:id')
    checkCode(@Param() { id }, @Body() { code }) {
        return this.appService.checkCode(id, code);
    }

    @Post('/auth/forgot')
    forgotPass(@Body() { email }) {
        return this.appService.forgotPass(email);
    }

    @Patch('/auth/change_pass/:id')
    changePass(@Param() { id }, @Body() { password }) {
        return this.appService.changePass(id, password);
    }

    @Delete('/logout/:token')
    logout(@Param() { token }) {
        return this.appService.logout(token);
    }

    @Delete('/delete/:id')
    deleteProfile(@Param() { id }, @Body() token: string) {
        return this.appService.deleteUser(id, token);
    }
}
