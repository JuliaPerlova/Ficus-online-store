import { Document } from 'mongoose';
import { IPostBody } from './body-post.interface';

export interface IPost extends Document {
    readonly author: string;
    readonly body: IPostBody;
    readonly likes: Array<string>;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly _id: string;
}
