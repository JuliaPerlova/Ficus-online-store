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
import { ApiHeader, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

import { UserGuard } from '../../../shared/guards/user.guard';
import { TokenGuard } from '../../../shared/guards/token.guard';
import { CreatePostDto } from 'apps/post-service/src/dto/post.dto';

import { PostApiService } from './post-api.service';
import { GetPostsDto } from './dto/get_posts.dto';
import { AddReactionDto } from './dto/reaction.dto';
import { actionEnum } from './enum/action.enum';

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
    @ApiHeader({ name: 'token' })
    createPost(@Param('uId') uId: string, @Body() data: CreatePostDto) {
        return this.appService.createPost(uId, data);
    }

    @Get('/posts/:postId')
    getPost(@Param('postId') postId: string) {
        return this.appService.getPostById(postId);
    }

    @UseGuards(TokenGuard)
    @Get('/:uId/posts')
    @ApiHeader({ name: 'token' })
    getUserPosts(@Param('uId') uId: string) {
        return this.appService.getUserPosts(uId);
    }

    @UseGuards(TokenGuard)
    @Put('/posts/:postId')
    @ApiHeader({ name: 'token' })
    @ApiQuery({ name: 'action', enum: Object.keys(actionEnum) })
    addReaction(
        @Param('postId') postId: string,
        @Query('action') action: actionEnum,
        @Body() { id }: AddReactionDto,
    ) {
        return action === 'like'
            ? this.appService.likePost(postId, id)
            : this.appService.dislikePost(postId, id);
    }

    @UseGuards(TokenGuard)
    @Patch('/posts/:postId')
    @ApiHeader({ name: 'token' })
    updatePost(@Param('postId') postId: string, @Body() data: CreatePostDto) {
        return this.appService.updatePost(postId, data);
    }

    @UseGuards(TokenGuard)
    @Delete('/posts/:postId')
    @ApiHeader({ name: 'token' })
    deletePost(@Param('postId') postId: string) {
        return this.appService.deletePost(postId);
    }
}
