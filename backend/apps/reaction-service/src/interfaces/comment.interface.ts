import { Document } from 'mongoose';

export interface IComment extends Document {
    readonly author: string;
    readonly commentId: string,
    readonly postId: string;
    readonly text: string;
    readonly likes: Array<string>;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
