import { ApiProperty } from '@nestjs/swagger';

export class UsernameDto {
    @ApiProperty()
    login: string;
}
