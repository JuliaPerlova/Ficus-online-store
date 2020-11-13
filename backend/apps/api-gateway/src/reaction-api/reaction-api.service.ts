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

    updateComment(commentId: string, data: object) {
        return this.reactionClient
            .send<object>({ cmd: 'update comment' }, { commentId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    deleteComment(commentId: string) {
        return this.reactionClient
            .send<object, string>({ cmd: 'delete comment' }, commentId)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }
}
