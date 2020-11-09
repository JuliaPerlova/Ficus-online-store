import { ApiProperty } from '@nestjs/swagger';

export class replyParamsDto {
    @ApiProperty()
    commentId: string;

    @ApiProperty()
    replyId: string;
}
