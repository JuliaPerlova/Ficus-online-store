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
    getAll() {
        return this.appService.getAll();
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

    @MessagePattern({ cmd: 'like post' })
    like({ postId, uId }) {
        return this.appService.like(postId, uId);
    }

    @MessagePattern({ cmd: 'dislike post' })
    dislike({ postId, uId }) {
        return this.appService.dislike(postId, uId);
    }

    @MessagePattern({ cmd: 'delete post' })
    deletePost(postId) {
        return this.appService.deletePost(postId);
    }
}
