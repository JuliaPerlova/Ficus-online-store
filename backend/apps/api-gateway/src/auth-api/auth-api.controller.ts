import { Controller, Get, Post, Body, UseFilters, Redirect, Param, Patch, Delete } from '@nestjs/common';

import { AuthApiService } from './auth-api.service';

//import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';

@Controller()
export class AuthApiController {
    constructor(private readonly appService: AuthApiService) {}

    @Post('/auth/login')
    //@UseFilters(HttpExceptionFilter)
    login(@Body() data: object) {
        return this.appService.login(data);
    }

    @Post('/auth/sign-up')
    //@UseFilters(HttpExceptionFilter)
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

    @Post('/auth/:id/confirm') 
    confirmEmail(@Param() { id }, @Body() code: string) {
        return this.appService.confirmEmail(id, code);
    }

    @Post('/auth/:id/check')
    checkCode(@Param() { id }, @Body() code: string) {
        return this.appService.checkCode(id, code);
    }

    @Get('/auth/forgot')
    forgotPass(@Body() email: string) {
        return this.appService.forgotPass(email);
    }

    @Patch('/auth/:id/change_pass')
    changePass(@Param() { id }, @Body() password: string) {
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