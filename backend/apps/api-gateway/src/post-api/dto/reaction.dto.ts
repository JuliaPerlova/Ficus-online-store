import { ApiProperty } from '@nestjs/swagger';

export class AddReactionDto {
    @ApiProperty()
    id: string;
}
