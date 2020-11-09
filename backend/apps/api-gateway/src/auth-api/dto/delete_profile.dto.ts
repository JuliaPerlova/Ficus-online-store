import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileDto {
    @ApiProperty()
    uId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    token: string;
}
