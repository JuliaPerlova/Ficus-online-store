import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostController {
    constructor(private readonly appService: PostService) {}

    @MessagePattern({ cmd: 'create post' })
    createPost({ id, data }) {
        return this.appService.create(id, data);
    }

    @MessagePattern({ cmd: 'get all posts' })
    getAll({ page, limit }) {
        return this.appService.getAll(page, limit);
    }

    @MessagePattern({ cmd: 'find post by id' })
    findPost(postId: string) {
        return this.appService.getPostById(postId);
    }

    @MessagePattern({ cmd: 'get all posts of user' })
    getUserPosts(uId: string) {
        return this.appService.getUserPosts(uId);
    }

    @MessagePattern({ cmd: 'update post' })
    updatePost({ postId, data }) {
        return this.appService.updatePost(postId, data);
    }

    @MessagePattern({ cmd: 'delete post' })
    deletePost(postId) {
        return this.appService.deletePost(postId);
    }
}
