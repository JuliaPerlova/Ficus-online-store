import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { TokenGuard } from '../../../shared/guards/token.guard';
import { UserGuard } from '../../../shared/guards/user.guard';
import { UserApiService } from './user-api.service';

@Controller()
@UseGuards(TokenGuard)
export class UserApiController {
    constructor(private readonly appService: UserApiService) {}

    @Post('/main/create')
    createUser(@Body() data) {
        return this.appService.createUser(data);
    }

    @Get('/main/users')
    getAllUsers() {
        return this.appService.getAllUsers();
    }

    @Get('/main/users/:uId')
    getUserById(@Param() uId: string) {
        return this.appService.findUserById(uId);
    }

    @Post('/main/users/find')
    getUserByUsername(@Body() username: string) {
        return this.appService.findUserByUsername(username);
    }

    @UseGuards(UserGuard)
    @Patch('/main/users/:id/update')
    updateUser(@Param() { id }, @Body() data: object) {
        return this.appService.updateUser(id, data);
    }
}
