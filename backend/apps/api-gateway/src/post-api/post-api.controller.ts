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
    Put,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { UserGuard } from '../../../shared/guards/user.guard';
import { TokenGuard } from '../../../shared/guards/token.guard';
import { CreatePostDto } from '../../../post-service/src/dto/post.dto';

import { PostApiService } from './post-api.service';
import { GetPostsDto } from './dto/get_posts.dto';

@Controller()
@ApiTags('posts')
export class PostApiController {
    constructor(private readonly appService: PostApiService) {}
    @Get('/posts')
    getPosts(@Query() { page, limit }: GetPostsDto) {
        return this.appService.getPosts({ page, limit });
    }

    @UseGuards(UserGuard)
    @Post('/:uId/posts')
    @ApiHeader({ name: 'x-auth-token' })
    createPost(@Param('uId') uId: string, @Body() data: CreatePostDto) {
        return this.appService.createPost(uId, data);
    }

    @Get('/posts/:postId')
    getPost(@Param('postId') postId: string) {
        return this.appService.getPostById(postId);
    }

    @UseGuards(TokenGuard)
    @Get('/:uId/posts')
    @ApiHeader({ name: 'x-auth-token' })
    getUserPosts(@Param('uId') uId: string) {
        return this.appService.getUserPosts(uId);
    }

    @UseGuards(TokenGuard)
    @Patch('/posts/:postId')
    @ApiHeader({ name: 'x-auth-token' })
    updatePost(@Param('postId') postId: string, @Body() data: CreatePostDto) {
        return this.appService.updatePost(postId, data);
    }

    @UseGuards(TokenGuard)
    @Delete('/posts/:postId')
    @ApiHeader({ name: 'x-auth-token' })
    deletePost(@Param('postId') postId: string) {
        return this.appService.deletePost(postId);
    }
}
