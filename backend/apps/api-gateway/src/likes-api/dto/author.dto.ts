import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
    @ApiProperty()
    author: string;
}
