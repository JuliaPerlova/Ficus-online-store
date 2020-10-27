 
import { Module } from '@nestjs/common';

import { AuthApiModule } from './auth-api/auth-api.module';
import { UserApiModule } from './user-api/user-api.module';

@Module({
  imports: [
    AuthApiModule,
    UserApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}