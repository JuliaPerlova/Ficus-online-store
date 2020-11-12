import { NestFactory } from '@nestjs/core';
import { LikesModule } from './likes.module';

import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        LikesModule,
        {
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        },
    );
    await app.listen(() => 'Likes Service is listening ');
}
bootstrap();
