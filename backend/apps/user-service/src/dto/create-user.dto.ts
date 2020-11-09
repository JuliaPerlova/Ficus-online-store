import { IsEmail, IsString, Matches, IsNotEmpty } from 'class-validator';
import { IAddress } from '../interfaces/address.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/m, {
        message: 'Weak password',
    })
    readonly password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly login: string;

    readonly status: string;
    readonly gender: string;

    @ApiProperty()
    readonly firstName: string;
    @ApiProperty()
    readonly lastName: string;
    @ApiProperty()
    readonly avatar: string;
    @ApiProperty()
    readonly avatarId: string;

    readonly phone: string;
    readonly role: string;
    readonly createdAt: Date;
    readonly address: IAddress;
    readonly _id: string;
}
