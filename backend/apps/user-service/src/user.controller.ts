import {
    Controller,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

//import { AuthGuard } from '../../shared/guards/auth.guard';

import { UserService } from './user.service';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
//@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({ cmd: 'create user' })
    createUser(data: CreateUserDto): Promise<IUser> {
        return this.userService.createUser(data);
    }

    @MessagePattern({ cmd: 'get all users' })
    getAllUsers(): Promise<IUser[]> {
        return this.userService.getAllUsers();
    }

    @MessagePattern({ cmd: 'get user by id' })
    findUserById({ uId }): Promise<IUser> {
        return this.userService.findUserById(uId);
    }

    @MessagePattern({ cmd: 'get user by username' })
    findUserByUsername({ login }): Promise<IUser[] | IUser> {
        return this.userService.findUserByUsername(login);
    }

    @MessagePattern({ cmd: 'update user' })
    updateUser({ id, data }): Promise<IUser> {
        return this.userService.updateUser(id, data);
    }

    @MessagePattern({ cmd: 'delete user' })
    deleteUser(id): Promise<IUser> {
        return this.userService.deleteUser(id);
    }
}
