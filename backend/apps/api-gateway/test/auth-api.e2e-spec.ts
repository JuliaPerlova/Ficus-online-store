import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import Redis from 'ioredis';

describe('AuthController (e2e)', () => {
    let app;
    let user = {
        login: 'user',
        email: 'sjythgqbrcbrkuhphf@upived.com',
        password: 'user123456',
    };
    let id;
    let code;
    let token;
    let accessToken;

    const client = new Redis(6379);

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/sign_up (POST) must create user and return data back', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({
                login: user.login,
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json');

        id = res.body._id;
        expect(res.status).toBe(201);

        expect(res.body.login).toEqual(user.login);
        expect(res.body.email).toEqual(user.email);
        expect(res.body.password).not.toBe(user.password);
        done();
    });

    it('/auth/sign_up (POST) must give mistake back because of not valid data', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({ login: '', email: '', password: '' })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body.description).toBeDefined();
        done();
    });

    it('/auth/sign_up (POST) must give mistake back because user was already created', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({
                login: user.login,
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json');

        expect(res.status).toBe(400);
        expect(res.body.description).toEqual(
            'This email is already registered in system',
        );
        done();
    });

    it('/auth/login (POST) must give mistake back because user did not confirm his email', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json');

        expect(res.status).toBe(403);
        expect(res.body.description).toEqual('Confirm your email');
        done();
    });

    it('/auth/confirm (PATCH) must return user data and change user status to active', async done => {
        code = await client.get(id);
        const res = await request(app.getHttpServer())
            .patch(`/auth/confirm`)
            .send({ id, code: JSON.parse(code) })
            .set('Accept', 'application/json');

        console.log(res.body);
        expect(res.status).toBe(200);
        expect(res.body.status).toBe('active');
        return done();
    });

    it('/auth/confirm (PATCH) must return false beacuse code was expired', async done => {
        const res = await request(app.getHttpServer())
            .patch(`/auth/confirm`)
            .send({ id, code })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({});
        return done();
    });

    it('/auth/login (POST) must give refresh token access token and user id', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json');

        token = res.body.refreshToken;
        expect(res.status).toBe(201);
        expect(res.body.refreshToken).toBeDefined();
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.id).toBe(id);
        return done();
    });

    it('/auth/refresh (PATCH) must return access token', async done => {
        const res = await request(app.getHttpServer())
            .patch(`/auth/refresh`)
            .send({ token })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(res.body.accessToken).toBeDefined();
        return done();
    });

    it('/auth/logout/:token (DELETE) must delete refresh token from the base', async done => {
        const res = await request(app.getHttpServer()).delete(
            `/auth/logout/${token}`,
        );
        const accessRes = await request(app.getHttpServer())
            .patch(`/auth/refresh`)
            .send({ token })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(accessRes.status).toBe(400);
        expect(accessRes.body.description).toEqual('Token was expired');
        return done();
    });

    it('/auth/forgot (PATCH) must change password and return updated user data', async done => {
        const res = await request(app.getHttpServer())
            .patch(`/auth/forgot`)
            .send({ id, password: 'b123456' })
            .set('Accept', 'application/json');

        user.password = 'b123456';
        expect(res.status).toBe(200);
        expect(res.body.email).toBe(user.email);
        expect(res.body._id).toBe(id);
        return done();
    });

    it('/auth/login (POST) must authorizate with new password', async done => {
        const res = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json');

        token = res.body.refreshToken;
        accessToken = res.body.accessToken;
        expect(res.status).toBe(201);
        expect(res.body.refreshToken).toBeDefined();
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.id).toBe(id);
        return done();
    });

    it('/auth/:id/token/:token (DELETE) must delete user profile', async done => {
        const res = await request(app.getHttpServer())
            .delete(`/auth/${id}/token/${token}`)
            .set('x-auth-token', `${accessToken}`);
        const login = await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json');

        expect(res.status).toBe(200);
        expect(login.status).toBe(403);
        expect(login.body.description).toEqual('User was not found');
        return done();
    });
});
