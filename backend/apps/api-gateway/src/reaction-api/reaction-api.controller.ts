import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    Patch
} from '@nestjs/common';
import { TokenGuard } from '../../../shared/guards/token.guard';

import { ReactionApiService } from './reaction-api.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from '../../../reaction-service/src/dto/create-comment.dto';
import { replyParamsDto } from './dto/replyParams.dto';
import { CreateReplyDto } from '../../../reaction-service/src/dto/create-reply.dto';

@Controller()
@ApiTags('comments')
export class ReactionApiController {
    constructor(private readonly appService: ReactionApiService) {}
    @Get('/:postId/comments')
    getComments(@Param('postId') postId: string) {
        return this.appService.getComments(postId);
    }

    @Get('/comments/:commentId')
    getCommentById(@Param('commentId') commentId: string) {
        return this.appService.getCommentById(commentId);
    }

    @UseGuards(TokenGuard)
    @Post('/:postId/comments')
    @ApiHeader({ name: 'x-auth-token' })
    createPost(
        @Param('postId') postId: string,
        @Body() data: CreateCommentDto,
    ) {
        return this.appService.createComment(postId, data);
    }

    @UseGuards(TokenGuard)
    @Post('/comments/:commentId/replies')
    @ApiHeader({ name: 'x-auth-token' })
    addReply(
        @Param('commentId') commentId: string,
        @Body() data: CreateReplyDto,
    ) {
        return this.appService.addReply(commentId, data);
    }

    @UseGuards(TokenGuard)
    @Patch('/comments/:commentId/replies/:replyId')
    @ApiHeader({ name: 'x-auth-token' })
    updateReply(
        @Param() { commentId, replyId }: replyParamsDto,
        @Body() data: CreateReplyDto,
    ) {
        return this.appService.updateReply(commentId, replyId, data);
    }

    @UseGuards(TokenGuard)
    @Delete('/comments/:commentId/replies/:replyId')
    @ApiHeader({ name: 'x-auth-token' })
    deleteReply(@Param() { commentId, replyId }: replyParamsDto) {
        return this.appService.deleteReply(commentId, replyId);
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
