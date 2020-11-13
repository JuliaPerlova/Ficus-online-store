import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ReactionService } from './reaction.service';

@Controller()
export class ReactionController {
    constructor(private readonly appService: ReactionService) {}
    @MessagePattern({ cmd: 'create comment' })
    createComment({ postId, data }) {
        return this.appService.createComment({ postId, ...data });
    }

    @MessagePattern({ cmd: 'get comments' })
    getComments(postId: string) {
        return this.appService.getComments(postId);
    }

    @MessagePattern({ cmd: 'get comment by id' })
    getCommentById(commentId: string) {
        return this.appService.getCommentById(commentId);
    }

    @MessagePattern({ cmd: 'delete comment' })
    deleteComment(commentId: string) {
        return this.appService.deleteComment(commentId);
    }
}
