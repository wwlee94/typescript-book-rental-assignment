import request from 'supertest';
import app from '../../src/App';

describe('Test for BookController', () => {
  test('GET /books', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body[0])).toEqual(expect.arrayContaining(['id', 'name', 'author', 'isRental', 'createdAt', 'updatedAt']));
  });

  test('GET /books/:id', async () => {
    const res = await request(app).get('/books/1');
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'name', 'author', 'isRental', 'createdAt', 'updatedAt']));
  });

  test('POST /books', async () => {
    const res = await request(app).post('/books').set('x-access-token', process.env.TEST_USER1_TOKEN!).send({
      name: 'TEST BOOK NAME',
      author: 'TEST AUTHOR',
    });
    expect(res.status).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'name', 'author', 'isRental', 'createdAt', 'updatedAt']));
  });

  test('PUT /books/:id', async () => {
    const res = await request(app).put('/books/1').set('x-access-token', process.env.TEST_USER1_TOKEN!).send({
      name: 'UPDATE TEST BOOK NAME',
      author: 'UPDATE TEST AUTHOR',
    });
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'name', 'author', 'isRental', 'createdAt', 'updatedAt']));
  });

  test('DELETE /books/:id', async () => {
    const res = await request(app).delete('/books/1').set('x-access-token', process.env.TEST_USER1_TOKEN!);
    expect(res.status).toEqual(200);
    expect(res.body).toMatchObject({
      message: 'Success delete book!',
    });
  });
});
