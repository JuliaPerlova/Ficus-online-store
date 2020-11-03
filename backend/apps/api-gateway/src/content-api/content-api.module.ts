import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { ContentApiController } from './content-api.controller';
import { ContentApiService } from './content-api.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                storage: memoryStorage(),
            }),
        }),
    ],
    controllers: [ContentApiController],
    providers: [ContentApiService],
})
export class ContentApiModule {}
