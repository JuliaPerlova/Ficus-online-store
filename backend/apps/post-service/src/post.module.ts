import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { postProviders } from './post.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [PostController],
    providers: [PostService, ...postProviders],
})
export class PostModule {}
