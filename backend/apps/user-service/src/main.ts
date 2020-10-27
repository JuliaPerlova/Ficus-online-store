import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
  transport: Transport.REDIS,
  options: {
    url: `${process.env.REDIS_URL}`,
  },
});
  await app.listen(() => 'User Service is listening ');
}
bootstrap();
