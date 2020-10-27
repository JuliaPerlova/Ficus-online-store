import { Controller, Get, Post, Body, UseFilters, Redirect, Param, Patch } from '@nestjs/common';

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

    @Post('/auth/:id/confirm') 
    checkCode(@Param() { id }, @Body() code: string) {
        return this.appService.confirmEmail(id, code);
    }
}