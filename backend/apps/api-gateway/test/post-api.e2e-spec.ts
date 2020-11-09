import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import 'dotenv/config';

describe('PostController (e2e)', () => {
    let app;
    let user = {
        email: `${process.env.SENDER_EMAIL}`,
        password: `${process.env.SENDER_PASSWORD}`,
    };
    const text =
        '<p>Administration of this blog is pleased to see you all here!</p>';
    let id;
    let accessToken;
    let post_id;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/main/:uId/posts/new (POST) must create post and return data back', async done => {
        const resLogin = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json');
        accessToken = resLogin.body.accessToken;
        id = resLogin.body.id;

        const res = await request(app.getHttpServer())
            .post(`/main/${id}/posts/new`)
            .send({
                body: {
                    text,
                    preview: text,
                },
            })
            .set('Accept', 'application/json')
            .set('x-auth-token', `${accessToken}`);

        post_id = res.body._id;
        expect(res.status).toBe(201);
        expect(res.body.body.text).toEqual(text);
        expect(res.body.body.preview).toEqual(text);
        expect(res.body.author._id).toBe(id);
        return done();
    });

    it('/main/post/:postId (GET) must return post', async done => {
        const res = await request(app.getHttpServer())
            .get(`/main/post/${post_id}`)
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body.body.text).toEqual(text);
        expect(res.body.body.preview).toEqual(text);
        expect(res.body.author._id).toBe(id);
        return done();
    });
});
