import { Module } from '@nestjs/common';
import { DatabaseModule } from 'apps/shared/database/database.module';
import { LikesController } from './likes.controller';
import { likesProviders } from './likes.provider';
import { LikesService } from './likes.service';

@Module({
  imports: [DatabaseModule],
  controllers: [LikesController],
  providers: [
    LikesService,
    ...likesProviders
  ],
  exports: [LikesService]
})
export class LikesModule {}
