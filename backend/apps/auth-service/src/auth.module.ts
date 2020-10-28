import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

import { UserModule } from 'apps/user-service/src/user.module';
import { TokenModule } from 'apps/token-service/src/token.module';
import { MailModule } from 'apps/shared/mail-service/mail.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379,
        }),
        UserModule,
        TokenModule,
        MailModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AppModule {}
