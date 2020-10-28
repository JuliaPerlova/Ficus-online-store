import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {}

    private async hashPass(password: string) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async createUser(createUserDto: CreateUserDto): Promise<IUser> {
        const password = await this.hashPass(createUserDto.password);
        const createdUser = new this.userModel({ ...createUserDto, password });
        return await createdUser.save();
    }

    async checkUser(email: string, password: string): Promise<IUser> {
        return await this.userModel
            .findOne({ email })
            .then(data => (data ? data.verifyPassword(password) : null));
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.userModel.find().exec();
    }

    async findUserById(id: string): Promise<IUser> {
        return await this.userModel.findById(id);
    }

    async findUserByUsername(login: string): Promise<IUser[] | IUser> {
        return await this.userModel
            .find({ login: { $regex: login, $options: 'i' } })
            .exec();
    }

    async findUserByEmail(email: string): Promise<IUser> {
        return await this.userModel.findOne({ email }).exec();
    }

    async updateUser(id: string, newData): Promise<IUser> {
        if (newData.password) {
            const password = await this.hashPass(newData.password);
            newData.password = password;
        }
        return await this.userModel
            .findByIdAndUpdate(id, newData, { new: true })
            .exec();
    }

    async deleteUser(id: string): Promise<IUser> {
        return await this.userModel.findByIdAndDelete(id);
    }
}
