import { Document } from 'mongoose';

export interface IReply extends Document {
    readonly author: string;
    readonly likes: Array<string>;
    readonly text: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
