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

import { TokenGuard } from '../../../shared/guards/token.guard';

import { PostApiService } from './post-api.service';

@Controller()
export class PostApiController {
    constructor(private readonly appService: PostApiService) {}
    @Get('/main/posts')
    getPosts() {
        return this.appService.getPosts();
    }

    @UseGuards(UserGuard)
    @Post('/main/posts/:id/new')
    createPost(@Param() { id }, @Body() data: object) {
        return this.appService.createPost(id, data);
    }

    @Get('/main/posts/:postId')
    getPost(@Param() { postId }) {
        return this.appService.getPostById(postId);
    }

    @UseGuards(TokenGuard)
    @Get('/main/:id/posts')
    getUserPosts(@Param() { id }) {
        return this.appService.getUserPosts(id);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:id/posts/:postId')
    updatePost(@Param() { id, postId }, @Body() data: object) {
        return this.appService.updatePost(postId, data);
    }

    @UseGuards(UserGuard)
    @Delete('/main/:id/posts/:postId')
    deletePost(@Param() { id, postId }) {
        return this.appService.deletePost(postId);
    }
}
