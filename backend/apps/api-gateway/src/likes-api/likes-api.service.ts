import { Injectable } from '@nestjs/common';
import {
    ClientProxy,
    ClientProxyFactory,
    Transport,
} from '@nestjs/microservices';

@Injectable()
export class LikesApiService {
    private likeClient: ClientProxy;

    constructor() {
        this.likeClient = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        });
    }

    getLikes(contentId: string) {
        return this.likeClient.send<object, string>(
            { cmd: 'get likes' },
            contentId,
        );
    }

    addLike(contentId: string, author: string, onContent: string) {
        return this.likeClient.send<object>(
            { cmd: 'add like' },
            { contentId, author, onContent },
        );
    }

    dislike(contentId: string, author: string) {
        return this.likeClient.send<object>(
            { cmd: 'dislike' },
            { contentId, author },
        );
    }
}
