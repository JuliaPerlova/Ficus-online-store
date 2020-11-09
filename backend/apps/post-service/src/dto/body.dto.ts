import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BodyDto {
    @ApiProperty()
    @IsNotEmpty()
    readonly text: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly preview: string;
}
