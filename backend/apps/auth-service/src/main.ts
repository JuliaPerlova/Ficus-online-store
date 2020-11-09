import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';

import 'dotenv/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
            transport: Transport.REDIS,
            options: {
                url: `${process.env.REDIS_URL}`,
            },
        },
    );
    await app.listen(() => 'Auth Service is listening ');
}
bootstrap();
