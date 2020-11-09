import { Document } from 'mongoose';
import { IReply } from './reply.interface';

export interface IComment extends Document {
    readonly author: string;
    readonly postId: string;
    readonly text: string;
    readonly likes: Array<string>;
    readonly replies: Array<IReply>;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
