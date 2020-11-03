import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Cache } from 'cache-manager';
import { createCipher } from 'crypto';

describe('AppController (e2e)', () => {
    let app;
    let user = {
        login: 'user',
        email: 'user@gmail.com',
        password: 'user123456',
    };
    let id;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/sign_up (POST) must create user and return data back', done => {
        return request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({
                login: user.login,
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                id = res.body.id;
                expect(res.body.login).toEqual(user.login);
                expect(res.body.email).toEqual(user.email);
                expect(res.body.password).not.toBe(user.password);
                done();
            });
    });

    it('/auth/sign_up (POST) must give mistake back because of not valid data', done => {
        return request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({ login: '', email: '', password: '' })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
            });
    });

    it('/auth/sign_up (POST) must give mistake back because user was already created', done => {
        return request(app.getHttpServer())
            .post('/auth/sign_up')
            .send({
                login: user.login,
                email: user.email,
                password: user.password,
            })
            .set('Accept', 'application/json')
            .expect(400)
            .end((err, res) => {
                if (err) {
                    expect(err).toEqual(
                        'This email is already registered in system',
                    );
                    expect(err).toBeInstanceOf(RpcException);
                    return done(err);
                }
            });
    });

    it('/auth/login (POST) must give mistake back because user did not confirm his email', done => {
        return request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: user.email, password: user.password })
            .set('Accept', 'application/json')
            .expect(403)
            .end((err, res) => {
                if (err) {
                    expect(err).toEqual('Confirm your email');
                    expect(err).toBeInstanceOf(RpcException);
                    return done(err);
                }
            });
    });

    it('/auth/confirm/:id (POST) must return user data and change user status to active', async done => {
        const code = await Cache.get(id);
        return request(app.getHttpServer())
            .post(`/auth/confirm/${id}`)
            .send({ code })
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body.status).toBe('active');
                return done();
            });
    });

    it('/auth/confirm/:id (POST) must return false beacuse code was expired', async done => {
        const code = await Cache.get(id);
        return request(app.getHttpServer())
            .post(`/auth/confirm/${id}`)
            .send({ code })
            .set('Accept', 'application/json')
            .expect(403)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                expect(res.body).toBe(false);
                return done();
            });
    });
});
