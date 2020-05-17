import request from 'supertest';
import app from '../../src/App';
import databaseConn, { closeDatabaseConn } from '../../src/database/databaseConn';

beforeAll(async () => {
  await databaseConn();
});

afterAll(async () => {
  await closeDatabaseConn();
});

describe('Test for UserController', () => {
  test('/users', async () => {
    const res = await request(app).get('/users').set('x-access-token', `${process.env.TEST_USER_TOKEN}`);
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      id: res.body.id,
      email: res.body.email,
      password: res.body.password,
    });
  });
});
