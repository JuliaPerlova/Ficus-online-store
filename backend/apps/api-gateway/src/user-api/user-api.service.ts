import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

import 'dotenv/config';

@Injectable()
export class UserApiService {
  private userClient: ClientProxy;

    constructor() {
        this.userClient = ClientProxyFactory.create({ 
            transport: Transport.REDIS, 
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        });
    }

    createUser(data: object) {
        return this.userClient.send<object>({ cmd: 'create user' }, data)
            .toPromise()
            .catch((err) => { throw new HttpException(err, HttpStatus.FORBIDDEN) });
    };

    getAllUsers() {
        return this.userClient.send<object>({ cmd: 'get all users' }, {});
    };

    findUserById(uId: string) {
        return this.userClient.send<object, string>({ cmd: 'get user by id' }, uId);
    };

    findUserByUsername(login: string) {
        return this.userClient.send<object, string>({ cmd: 'get user by username' }, login);
    };

    updateUser(id: string, data: object) {
        return this.userClient.send<object>({ cmd: 'update user' }, { id, data });
    };

    deleteUser(id: string) {
        return this.userClient.send<object, string>({ cmd: 'delete user' }, id); 
    };

};