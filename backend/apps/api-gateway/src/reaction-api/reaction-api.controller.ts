import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    Patch,
    Query
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { TokenGuard } from '../../../shared/guards/token.guard';
import { ReactionApiService } from './reaction-api.service';
import { CreateCommentDto } from '../../../reaction-service/src/dto/create-comment.dto';

@Controller()
@ApiTags('comments')
export class ReactionApiController {
    constructor(private readonly appService: ReactionApiService) {}
    @Get('/comments')
    getComments(@Query('postId') postId: string) {
        return this.appService.getComments(postId);
    }

    @Get('/comments/:commentId')
    getCommentById(@Param('commentId') commentId: string) {
        return this.appService.getCommentById(commentId);
    }

    @UseGuards(TokenGuard)
    @Post('/comments')
    @ApiHeader({ name: 'x-auth-token' })
    createPost(
        @Query("postId") postId: string,
        @Body() data: CreateCommentDto,
    ) {
        return this.appService.createComment(postId, data);
    }

    @UseGuards(TokenGuard)
    @Patch('/comments/:commentId')
    @ApiHeader({ name: 'x-auth-token' })
    updateComment(
        @Param('commentId') commentId: string,
        @Body() data: CreateCommentDto,
    ) {
        return this.appService.updateComment(commentId, data);
    }

    @UseGuards(TokenGuard)
    @Delete('/comments/:commentId')
    @ApiHeader({ name: 'x-auth-token' })
    deletePost(@Param('commentId') commentId: string) {
        return this.appService.deleteComment(commentId);
    }
}
