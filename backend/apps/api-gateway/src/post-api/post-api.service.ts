import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import {
    ClientProxy,
    Transport,
    ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class PostApiService {
    private postClient: ClientProxy;

    constructor() {
        this.postClient = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        });
    }

    getPosts({ page, limit }) {
        return this.postClient.send<object>(
            { cmd: 'get all posts' },
            { page, limit },
        );
    }

    createPost(id: string, data: object) {
        return this.postClient
            .send<object>({ cmd: 'create post' }, { id, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    getPostById(postId: string) {
        return this.postClient
            .send<object, string>({ cmd: 'find post by id' }, postId)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    getUserPosts(id: string) {
        return this.postClient
            .send<object, string>({ cmd: 'get all posts of user' }, id)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    likePost(postId: string, uId: string) {
        return this.postClient
            .send<object>({ cmd: 'like post' }, { postId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    dislikePost(postId: string, uId: string) {
        return this.postClient
            .send<object>({ cmd: 'dislike post' }, { postId, uId })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    updatePost(postId: string, data: object) {
        return this.postClient
            .send<object>({ cmd: 'update post' }, { postId, data })
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }

    deletePost(postId: string) {
        return this.postClient
            .send<object, string>({ cmd: 'delete post' }, postId)
            .toPromise()
            .catch(err => {
                throw new HttpException(err, HttpStatus.FORBIDDEN);
            });
    }
}
