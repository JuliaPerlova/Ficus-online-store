import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProviders } from './user.provider';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    ...usersProviders,
  ],
  exports: [UserService]
})
export class UserModule {}
