import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import {
    ClientProxy,
    Transport,
    ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class ReactionApiService {
    private reactionClient: ClientProxy;

    constructor() {
        this.reactionClient = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        });
    }

    createComment(postId: string, data: object) {
        return this.reactionClient
            .send<object>({ cmd: 'create comment' }, { postId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    getComments(postId: string) {
        return this.reactionClient.send<object, string>(
            { cmd: 'get comments' },
            postId,
        );
    }

    getCommentById(commentId: string) {
        return this.reactionClient.send<object, string>(
            { cmd: 'get comment by id' },
            commentId,
        );
    }

    likeComment(commentId: string, uId: string) {
        return this.reactionClient
            .send<object>({ cmd: 'like comment' }, { commentId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    dislikeComment(commentId: string, uId: string) {
        return this.reactionClient
            .send<object>({ cmd: 'dislike comment' }, { commentId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    likeReply(replyId: string, uId: string) {
        return this.reactionClient
            .send<object>({ cmd: 'like reply' }, { replyId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    dislikeReply(replyId: string, uId: string) {
        return this.reactionClient
            .send<object>({ cmd: 'dislike reply' }, { replyId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    updateComment(commentId: string, data: object) {
        return this.reactionClient
            .send<object>({ cmd: 'update comment' }, { commentId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    addReply(commentId: string, data: object) {
        return this.reactionClient
            .send<object>({ cmd: 'add reply' }, { commentId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    updateReply(commentId: string, replyId: string, data: object) {
        return this.reactionClient
            .send<object>({ cmd: 'update reply' }, { commentId, replyId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    deleteReply(commentId: string, replyId: string) {
        return this.reactionClient
            .send<object>({ cmd: 'delete reply' }, { commentId, replyId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    deleteComment(commentId: string) {
        return this.reactionClient
            .send<object, string>({ cmd: 'delete post' }, commentId)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }
}
