import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';


describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Handles a signup request', () => {
    const email = 'nghixdkmvbxcvmnxcv@gmail.com';
    const password = 'abcABC@123'
    return request(app.getHttpServer())
        .post('/auth/signup')
        .send({email:email,password:password})
        .expect(201)
        .then((res:any)=>{
            const { id, email} = res.body;
            expect(id).toBeDefined();
            expect(email).toEqual(email);
        })
  });

  it('Signup a new user then get the currently logged in user', async () => {
    const email = 'nghi@gmail.com';
    const password = 'abcABC@123';
    const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({email:email,password:password})
        .expect(201)
  
    const cookie = res.get('Set-Cookie');
    const {body} = await request(app.getHttpServer())
          .get('/auth/whoami')
          .set('Cookie',cookie)
          .expect(200)
    expect(body.email).toEqual(email)
  });
});
