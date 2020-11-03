import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReactionService } from './reaction.service';

@Controller()
export class ReactionController {
    constructor(private readonly appService: ReactionService) {}
    @MessagePattern({ cmd: 'create comment' })
    createComment({ uId, postId, data }) {
        return this.appService.createComment({ author: uId, postId, ...data });
    }

    @MessagePattern({ cmd: 'get comments' })
    getComments(postId: string) {
        return this.appService.getComments(postId);
    }

    @MessagePattern({ cmd: 'get comment by id' })
    getCommentById(commentId: string) {
        return this.appService.getCommentById(commentId);
    }

    @MessagePattern({ cmd: 'update comment' })
    updateComment({ commentId, data }) {
        return this.appService.updateComment(commentId, data);
    }

    @MessagePattern({ cmd: 'like comment' })
    likeComment({ commentId, uId }) {
        return this.appService.like(commentId, uId);
    }

    @MessagePattern({ cmd: 'dislike comment' })
    disikeComment({ commentId, uId }) {
        return this.appService.dislike(commentId, uId);
    }

    @MessagePattern({ cmd: 'like reply' })
    likeReply({ replyId, uId }) {
        return this.appService.likeReply(replyId, uId);
    }

    @MessagePattern({ cmd: 'dislike reply' })
    disikeReply({ replyId, uId }) {
        return this.appService.dislikeReply(replyId, uId);
    }

    @MessagePattern({ cmd: 'add reply' })
    addReply({ commentId, data }) {
        console.log(data);
        return this.appService.addReply(commentId, data);
    }

    @MessagePattern({ cmd: 'update reply' })
    updateReply({ commentId, replyId, data }) {
        return this.appService.updateReply(commentId, replyId, data);
    }

    @MessagePattern({ cmd: 'delete reply' })
    deleteReply({ commentId, replyId }) {
        return this.appService.deleteReply(commentId, replyId);
    }

    @MessagePattern({ cmd: 'delete comment' })
    deleteComment(commentId: string) {
        return this.appService.deleteComment(commentId);
    }
}
