import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BodyDto } from './body.dto';

export class CreatePostDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly body: BodyDto;

    readonly likes: Array<string>;
    readonly author: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly _id: string;
}
