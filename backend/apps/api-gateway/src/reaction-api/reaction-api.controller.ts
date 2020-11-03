import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    Patch,
} from '@nestjs/common';

import { UserGuard } from 'apps/shared/guards/user.guard';
import { TokenGuard } from 'apps/shared/guards/token.guard';

import { ReactionApiService } from './reaction-api.service';

@Controller()
export class ReactionApiController {
    constructor(private readonly appService: ReactionApiService) {}
    @Get('/main/:postId/comments')
    getComments(@Param() { postId }) {
        return this.appService.getComments(postId);
    }

    @Get('/main/comments/:commentId')
    getCommentById(@Param() { commentId }) {
        return this.appService.getCommentById(commentId);
    }

    @UseGuards(TokenGuard)
    @Post('/main/:uId/post/:postId/comments/new')
    createPost(@Param() { uId, postId }, @Body() data) {
        return this.appService.createComment(uId, postId, data);
    }

    @UseGuards(UserGuard)
    @Post('/main/:uId/comment/:commentId/like')
    likeComment(@Param() { uId, commentId }) {
        return this.appService.likeComment(commentId, uId);
    }

    @UseGuards(UserGuard)
    @Post('/main/:uId/comment/:commentId/dislike')
    dislikeComment(@Param() { uId, commentId }) {
        return this.appService.dislikeComment(commentId, uId);
    }

    @UseGuards(UserGuard)
    @Post('/main/:uId/comment/:commentId/reply')
    addReply(@Param() { uId, commentId }, @Body() data) {
        return this.appService.addReply(commentId, { author: uId, ...data });
    }

    @UseGuards(TokenGuard)
    @Patch('/main/comment/:commentId/replies/:replyId')
    updateReply(@Param() { commentId, replyId }, @Body() data) {
        return this.appService.updateReply(commentId, replyId, data);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/replies/:replyId/like')
    likeReply(@Param() { uId, replyId }) {
        return this.appService.likeReply(replyId, uId);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/replies/:replyId/dislike')
    dislikeReply(@Param() { uId, replyId }) {
        return this.appService.dislikeReply(replyId, uId);
    }

    @UseGuards(TokenGuard)
    @Delete('/main/comment/:commentId/reples/:replyId')
    deleteReply(@Param() { commentId, replyId }) {
        return this.appService.deleteReply(commentId, replyId);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/comments/:commentId')
    updateComment(@Param() { uId, commentId }, @Body() data: object) {
        return this.appService.updateComment(commentId, data);
    }

    @UseGuards(UserGuard)
    @Delete('/main/:uId/comments/:commentId')
    deletePost(@Param() { uId, commentId }) {
        return this.appService.deleteComment(commentId);
    }
}
