import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}
