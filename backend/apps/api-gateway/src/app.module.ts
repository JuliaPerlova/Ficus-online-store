import { Module } from '@nestjs/common';

import { AuthApiModule } from './auth-api/auth-api.module';
import { UserApiModule } from './user-api/user-api.module';
import { PostApiModule } from './post-api/post-api.module';

@Module({
    imports: [AuthApiModule, UserApiModule, PostApiModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
