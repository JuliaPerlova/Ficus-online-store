import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';

import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        PostModule,
        {
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        },
    );
    await app.listen(() => 'Post Service is listening ');
}
bootstrap();
