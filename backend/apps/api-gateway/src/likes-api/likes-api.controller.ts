import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiQuery, ApiTags } from "@nestjs/swagger";
import { contentEnum } from "apps/likes-service/src/enum/content.enum";
import { TokenGuard } from "apps/shared/guards/token.guard";
import { AuthorDto } from "./dto/author.dto";

import { LikesApiService } from "./likes-api.service";

@Controller()
@ApiTags('likes')
export class LikesApiController {
    constructor(private readonly appService: LikesApiService) {}

    @Get('/likes/:contentId')
    getLikes(@Param("contentId") contentId: string) {
        return this.appService.getLikes(contentId);
    }

    @UseGuards(TokenGuard)
    @Post('/likes/:contentId')
    @ApiHeader({ name: 'x-auth-token' })
    @ApiQuery({ name: 'content', enum: Object.keys(contentEnum) })
    addLike(@Param("contentId") contentId: string, @Query("content") content: contentEnum, @Body() { author } : AuthorDto) {
        return this.appService.addLike(contentId, author, content);
    }

    @UseGuards(TokenGuard)
    @Delete('/likes/:contentId')
    @ApiHeader({ name: 'x-auth-token' })
    dislike(@Param("contentId") contentId: string, @Query("author") author: string) {
        return this.appService.dislike(contentId, author);
    }
}