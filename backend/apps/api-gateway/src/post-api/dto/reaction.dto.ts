import { ApiProperty } from '@nestjs/swagger';
import { actionEnum } from '../enum/action.enum';

export class AddReactionDto {
    @ApiProperty()
    id: string;
}
