import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly author: string;

    @ApiProperty()
    readonly commentId: string;

    readonly postId: string;

    @ApiProperty()
    readonly text: string;

    readonly likes: number;
    readonly _id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
