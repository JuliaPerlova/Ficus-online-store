import { Injectable, Inject } from '@nestjs/common';

import { Model } from 'mongoose';

import { IToken } from './interfaces/token.interface';
import { CreateTokenDto } from './dto/create-token.dto';


@Injectable()
export class TokenService {
    constructor(@Inject('TOKEN_MODEL') private readonly userTokenModel: Model<IToken>) {}

    async create(createUserTokenDto: CreateTokenDto): Promise<IToken> {
        const userToken = new this.userTokenModel(createUserTokenDto);
        return await userToken.save();
    }

    async find(token: string): Promise<IToken> {
        return await this.userTokenModel.findOne({ token });
    }

    async delete(token: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteOne({ token });
    }

    async deleteAll(uId: string): Promise<{ ok?: number, n?: number }> {
        return await this.userTokenModel.deleteMany({ uId });
    }
}