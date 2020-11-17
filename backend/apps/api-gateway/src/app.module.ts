import { Module } from '@nestjs/common';

import { AuthApiModule } from './auth-api/auth-api.module';
import { UserApiModule } from './user-api/user-api.module';
import { PostApiModule } from './post-api/post-api.module';
import { ReactionApiModule } from './reaction-api/reaction-api.module';
import { ContentApiModule } from './content-api/content-api.module';
import { LikesApiModule } from './likes-api/likes-api.module';

@Module({
    imports: [
        AuthApiModule,
        UserApiModule,
        PostApiModule,
        ReactionApiModule,
        ContentApiModule,
        LikesApiModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
