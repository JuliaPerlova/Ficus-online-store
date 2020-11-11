import { Module } from '@nestjs/common';

import { LikesApiController } from './likes-api.controller';
import { LikesApiService } from './likes-api.service';

@Module({
    controllers: [LikesApiController],
    providers: [LikesApiService],
})
export class LikesApiModule {}