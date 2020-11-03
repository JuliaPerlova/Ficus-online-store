import { Module } from '@nestjs/common';

import { ReactionApiController } from './reaction-api.controller';
import { ReactionApiService } from './reaction-api.service';

@Module({
    controllers: [ReactionApiController],
    providers: [ReactionApiService],
})
export class ReactionApiModule {}
