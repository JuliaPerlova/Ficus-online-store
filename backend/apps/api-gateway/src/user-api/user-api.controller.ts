import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'apps/user-service/src/dto/create-user.dto';
import { TokenGuard } from '../../../shared/guards/token.guard';
import { UserGuard } from '../../../shared/guards/user.guard';
import { UsernameDto } from './dto/username.dto';
import { UserApiService } from './user-api.service';

@Controller()
@ApiTags('users')
export class UserApiController {
    constructor(private readonly appService: UserApiService) {}

    @Get('/users')
    getAllUsers() {
        return this.appService.getAllUsers();
    }

    @Get('/users/:uId')
    getUserById(@Param('uId') uId: string) {
        return this.appService.findUserById(uId);
    }

    @Post('/users/find')
    getUserByUsername(@Body() { login }: UsernameDto) {
        return this.appService.findUserByUsername(login);
    }

    @UseGuards(UserGuard)
    @Patch('/users/:uId')
    @ApiHeader({ name: 'x-auth-token' })
    updateUser(@Param('uId') uId: string, @Body() data: CreateUserDto) {
        return this.appService.updateUser(uId, data);
    }
}
