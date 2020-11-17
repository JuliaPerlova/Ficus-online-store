import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import 'dotenv/config';

declare const module: any;

const allowList = ['http://192.168.88.41:3000', 'http://localhost:3000'];

const corsAllowFunc = (origin, callback) => {
    const isAllowed = allowList.indexOf(origin) !== -1;
    return isAllowed ? callback(null, true) : callback(null, false);
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({origin: corsAllowFunc});

    const options = new DocumentBuilder()
        .setTitle('Api gateway')
        .setDescription('This api was written for trainee project')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(`${process.env.API_GATEWAY}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
bootstrap();
