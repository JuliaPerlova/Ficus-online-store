import { ApiProperty } from '@nestjs/swagger';

export class GetPostsDto {
    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;
}
