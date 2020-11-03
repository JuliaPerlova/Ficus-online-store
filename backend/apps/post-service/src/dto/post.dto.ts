import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IPostBody } from '../interfaces/body-post.interface';

export class CreatePostDto {
    @IsNotEmpty()
    readonly body: IPostBody;

    readonly likes: Array<string>;
    readonly preview: string;
    readonly author: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly _id: string;
}
