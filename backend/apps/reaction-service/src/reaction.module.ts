import { Module } from '@nestjs/common';
import { DatabaseModule } from 'apps/shared/database/database.module';

import { ReactionController } from './reaction.controller';
import { reactionProviders } from './reaction.provider';
import { ReactionService } from './reaction.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ReactionController],
    providers: [ReactionService, ...reactionProviders],
    exports: [ReactionService],
})
export class ReactionModule {}
