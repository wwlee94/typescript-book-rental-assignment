import request from 'supertest';
import app from '../../src/App';

describe('Test for UserController', () => {
  test('GET /users', async () => {
    const res = await request(app).get('/users').set('x-access-token', process.env.TEST_USER1_TOKEN!);
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'email', 'password']));
  });

  test('POST /users', async () => {
    const res = await request(app).post('/users').send({
      email: 'postTest@naver.com',
      password: 'postTest',
      passwordConfirm: 'postTest',
    });
    expect(res.status).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'email']));
  });

  test('DELETE /users', async () => {
    const res = await request(app).delete('/users').set('x-access-token', process.env.TEST_USER2_TOKEN!);
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      message: 'Success delete user!',
    });
  });
});
