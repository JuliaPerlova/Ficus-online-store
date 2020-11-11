import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LikesService } from './likes.service';

@Controller()
export class LikesController {
    constructor(private readonly appService: LikesService) {}

    @MessagePattern({ cmd: 'get likes' })
    getLikes(contentId: string) {
        return this.appService.getLikes(contentId);
    }

    @MessagePattern({ cmd: 'add like' })
    addLike({ contentId, author, onContent }) {
        console.log({ contentId, author, onContent })
        return this.appService.addLike(author, contentId, onContent);
    }

    @MessagePattern({ cmd: 'dislike' })
    dislike({ contentId, author }) {
        return this.appService.dislike(author, contentId);
    }
}