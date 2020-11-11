import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    readonly author: string;

    @ApiProperty()
    readonly contentId: string;

    readonly onContent: string;
}
