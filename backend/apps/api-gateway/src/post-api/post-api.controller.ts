import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
    Patch,
    Query,
} from '@nestjs/common';
import { UserGuard } from 'apps/shared/guards/user.guard';

import { TokenGuard } from '../../../shared/guards/token.guard';

import { PostApiService } from './post-api.service';

@Controller()
export class PostApiController {
    constructor(private readonly appService: PostApiService) {}
    @Get('/main/posts')
    getPosts(@Query() { page, limit }) {
        return this.appService.getPosts({ page, limit });
    }

    @UseGuards(UserGuard)
    @Post('/main/:uId/posts/new')
    createPost(@Param() { uId }, @Body() data: object) {
        return this.appService.createPost(uId, data);
    }

    @Get('/main/post/:postId')
    getPost(@Param() { postId }) {
        return this.appService.getPostById(postId);
    }

    @UseGuards(TokenGuard)
    @Get('/main/:uId/posts')
    getUserPosts(@Param() { uId }) {
        return this.appService.getUserPosts(uId);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/posts/:postId/like')
    likePost(@Param() { uId, postId }) {
        return this.appService.likePost(postId, uId);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/posts/:postId/dislike')
    dislikePost(@Param() { uId, postId }) {
        return this.appService.dislikePost(postId, uId);
    }

    @UseGuards(UserGuard)
    @Patch('/main/:uId/posts/:postId')
    updatePost(@Param() { uId, postId }, @Body() data: object) {
        return this.appService.updatePost(postId, data);
    }

    @UseGuards(UserGuard)
    @Delete('/main/:uId/posts/:postId')
    deletePost(@Param() { uId, postId }) {
        return this.appService.deletePost(postId);
    }
}
