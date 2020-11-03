import { NestFactory } from '@nestjs/core';
import { ReactionModule } from './reaction.module';

import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        ReactionModule,
        {
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        },
    );
    await app.listen(() => 'Action Service is listening ');
}
bootstrap();
