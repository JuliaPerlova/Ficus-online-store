import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    Patch,
    Put,
    Query,
} from '@nestjs/common';

import { UserGuard } from '../../../shared/guards/user.guard';
import { TokenGuard } from '../../../shared/guards/token.guard';

import { ReactionApiService } from './reaction-api.service';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from 'apps/reaction-service/src/dto/create-comment.dto';
import { actionEnum } from '../post-api/enum/action.enum';
import { CreateReplyDto } from 'apps/reaction-service/src/dto/create-reply.dto';
import { idDto } from './dto/id.dto';
import { replyParamsDto } from './dto/replyParams.dto';

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
    @ApiHeader({ name: 'token' })
    createPost(
        @Param('postId') postId: string,
        @Body() data: CreateCommentDto,
    ) {
        return this.appService.createComment(postId, data);
    }

    @UseGuards(TokenGuard)
    @Put('/comments/:commentId')
    @ApiHeader({ name: 'token' })
    @ApiQuery({ name: 'action', enum: Object.keys(actionEnum) })
    addReaction(
        @Param('commentId') commentId: string,
        @Query('action') action: actionEnum,
        @Body() { id }: idDto,
    ) {
        return action === 'like'
            ? this.appService.likeComment(commentId, id)
            : this.appService.dislikeComment(commentId, id);
    }

    @UseGuards(TokenGuard)
    @Post('/comments/:commentId/replies')
    @ApiHeader({ name: 'token' })
    addReply(
        @Param('commentId') commentId: string,
        @Body() data: CreateReplyDto,
    ) {
        return this.appService.addReply(commentId, data);
    }

    @UseGuards(TokenGuard)
    @Patch('/comments/:commentId/replies/:replyId')
    @ApiHeader({ name: 'token' })
    updateReply(
        @Param() { commentId, replyId }: replyParamsDto,
        @Body() data: CreateReplyDto,
    ) {
        return this.appService.updateReply(commentId, replyId, data);
    }

    @UseGuards(TokenGuard)
    @Put('/comments/:commentId/replies/:replyId')
    @ApiHeader({ name: 'token' })
    @ApiQuery({ name: 'action', enum: Object.keys(actionEnum) })
    addActionReply(
        @Param() { commentId, replyId }: replyParamsDto,
        @Query('action') action: actionEnum,
        @Body() { id }: idDto,
    ) {
        return action === 'like'
            ? this.appService.likeReply(replyId, id)
            : this.appService.dislikeReply(replyId, id);
    }

    @UseGuards(TokenGuard)
    @Delete('/comments/:commentId/replies/:replyId')
    @ApiHeader({ name: 'token' })
    deleteReply(@Param() { commentId, replyId }: replyParamsDto) {
        return this.appService.deleteReply(commentId, replyId);
    }

    @UseGuards(TokenGuard)
    @Patch('/comments/:commentId')
    @ApiHeader({ name: 'token' })
    updateComment(
        @Param('commentId') commentId: string,
        @Body() data: CreateCommentDto,
    ) {
        return this.appService.updateComment(commentId, data);
    }

    @UseGuards(TokenGuard)
    @Delete('/comments/:commentId')
    @ApiHeader({ name: 'token' })
    deletePost(@Param('commentId') commentId: string) {
        return this.appService.deleteComment(commentId);
    }
}
