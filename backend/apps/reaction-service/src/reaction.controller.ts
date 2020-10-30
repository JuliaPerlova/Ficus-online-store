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
    likePost({ postId, uId }) {
        return this.appService.like(postId, uId);
    }

    @MessagePattern({ cmd: 'dislike comment' })
    disikePost({ postId, uId }) {
        return this.appService.dislike(postId, uId);
    }

    @MessagePattern({ cmd: 'delete comment' })
    deleteComment(commentId: string) {
        return this.appService.deleteComment(commentId);
    }
}
