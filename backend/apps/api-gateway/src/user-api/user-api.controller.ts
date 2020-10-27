import { Controller, Get, Post, Body, Param, Patch, Delete, UseFilters, Query } from '@nestjs/common';
//import { HttpExceptionFilter } from '../../../shared/filters/src/http-exception.filter';
import { UserApiService } from './user-api.service';

@Controller()
//@UseFilters(HttpExceptionFilter)
export class UserApiController {
    constructor(private readonly appService: UserApiService) {}
    
    @Post('/main/create')
    createUser(@Body() data) {
        return this.appService.createUser(data);
    };

    @Get('/main/users')
    getAllUsers() {
        return this.appService.getAllUsers();
    };

    @Get('/main/users/:uId')
    getUserById(@Param() uId: string) {
        return this.appService.findUserById(uId);
    };

    @Post('/main/users/find')
    getUserByUsername(@Body() username: string) {
        return this.appService.findUserByUsername(username);
    };

    @Patch('/main/users/:id/update')
    updateUser(@Param() { id }, @Body() data: object) {
        return this.appService.updateUser(id, data);
    };

    @Delete('/main/users/:id/delete')
    deleteUser(@Param() { id }) {
        return this.appService.deleteUser(id);
    }
    // @Post('/main/settings')
    // getUser(@Body() { token, uId }) {
    //     return this.appService.getUser(token, uId);
    // }

//     @Patch('/main/settings')
//     updateUser(@Body() { token, uId, data }) {
//         return this.appService.updateUser(token, uId, data);
//     }

//     @Delete('/main/settings')
//     deleteUser(@Body() { token, uId }) {
//         return this.appService.deleteUser(token, uId);
//     }
}