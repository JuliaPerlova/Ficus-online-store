import { IsNotEmpty } from 'class-validator';
import { IReply } from '../interfaces/reply.interface';

export class CreateCommentDto {
    @IsNotEmpty()
    readonly author: string;
    readonly postId: string;
    readonly text: string;

    readonly likes: number;
    readonly replies: Array<IReply>;
    readonly _id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
