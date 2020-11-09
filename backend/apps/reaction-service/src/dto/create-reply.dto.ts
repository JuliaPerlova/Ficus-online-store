import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReplyDto {
    @ApiProperty()
    author: string;

    @ApiProperty()
    @IsNotEmpty()
    text: string;
}
