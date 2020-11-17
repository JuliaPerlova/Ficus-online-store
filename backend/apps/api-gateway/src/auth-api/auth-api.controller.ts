import {
    Controller,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
    UseFilters,
    Put,
} from '@nestjs/common';

import { HttpExceptionFilter } from '../../../shared/filters/http-exception.filter';
import { AuthApiService } from './auth-api.service';
import { UserGuard } from '../../../shared/guards/user.guard';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign_up.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { EmailDto } from './dto/email.dto';
import { ConfirmationDto } from './dto/confirmation.dto';
import { ChangePasswordDto } from './dto/change_password.dto';
import { DeleteProfileDto } from './dto/delete_profile.dto';

@Controller()
@ApiTags('authentication')
@UseFilters(HttpExceptionFilter)
export class AuthApiController {
    constructor(private readonly appService: AuthApiService) {}

    @Post('/auth/login')
    login(@Body() data: LoginDto) {
        return this.appService.login(data);
    }

    @Post('/auth/sign_up')
    signUp(@Body() data: SignUpDto) {
        return this.appService.signUp(data);
    }

    @Patch('/auth/refresh')
    refreshToken(@Body() { token }: TokenDto) {
        return this.appService.refreshToken(token);
    }

    @Post('/auth/confirm')
    getConfirmation(@Body() { email }: EmailDto) {
        return this.appService.getEmailVerification(email);
    }

    @Patch('/auth/confirm')
    async confirmEmail(@Body() { id, code }: ConfirmationDto) {
        return this.appService.confirmEmail(id, code);
    }

    @Put('/auth/check')
    checkCode(@Body() { id, code }: ConfirmationDto) {
        return this.appService.checkCode(id, code);
    }

    @Post('/auth/forgot')
    forgotPass(@Body() { email }: EmailDto) {
        return this.appService.forgotPass(email);
    }

    @Patch('/auth/forgot')
    changePass(@Body() { id, password }: ChangePasswordDto) {
        return this.appService.changePass(id, password);
    }

    @Delete('/auth/logout/:token')
    logout(@Param('token') token: string) {
        return this.appService.logout(token);
    }

    @UseGuards(UserGuard)
    @Delete('/auth/:uId/token/:token')
    @ApiHeader({ name: 'x-auth-token' })
    deleteProfile(@Param() { uId, token }: DeleteProfileDto) {
        return this.appService.deleteUser(uId, token);
    }
}
