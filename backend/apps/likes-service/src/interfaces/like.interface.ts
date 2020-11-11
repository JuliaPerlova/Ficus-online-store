import { Document } from 'mongoose';

export interface ILike extends Document {
    readonly author: string;
    readonly contentId: string;
    readonly onContent: string;
}