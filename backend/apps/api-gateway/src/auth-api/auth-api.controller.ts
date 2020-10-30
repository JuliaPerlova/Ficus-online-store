import {
    Controller,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';

import { AuthApiService } from './auth-api.service';
import { TokenGuard } from '../../../shared/guards/token.guard';

@Controller()
export class AuthApiController {
    constructor(private readonly appService: AuthApiService) {}

    @Post('/auth/login')
    login(@Body() data: object) {
        return this.appService.login(data);
    }

    @Post('/auth/sign_up')
    signUp(@Body() data: object) {
        return this.appService.signUp(data);
    }

    @Post('/auth/refresh')
    refreshToken(@Body() { token }) {
        return this.appService.refreshToken(token);
    }

    @Post('/auth/get_confirm')
    getConfirmation(@Body() { email }) {
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

    @UseGuards(TokenGuard)
    @Delete('/delete/:id/token/:token')
    deleteProfile(@Param() { id, token }) {
        return this.appService.deleteUser(id, token);
    }
}
