import request from 'supertest';
import app from '../../src/App';
import { userPayload } from '../../src/utils/util';

describe('Test for AuthController', () => {
  test('GET /login', async () => {
    const res = await request(app).post('/login').send(userPayload[0]);
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['token']));
  });
});
