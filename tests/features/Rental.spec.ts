import request from 'supertest';
import app from '../../src/App';

describe('Test for RentalController', () => {
  test('GET /rentals', async () => {
    const res = await request(app).get('/rentals').set('x-access-token', process.env.TEST_USER1_TOKEN!);
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body[0])).toEqual(expect.arrayContaining(['id', 'book', 'rentalDateAt', 'returnDateAt']));
  });

  test('GET /rentals/books/:bookId', async () => {
    const res = await request(app).get('/rentals/books/2').set('x-access-token', process.env.TEST_USER1_TOKEN!);
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'book', 'rentalDateAt', 'returnDateAt']));
  });

  test('POST /rentals', async () => {
    const res = await request(app).post('/rentals').set('x-access-token', process.env.TEST_USER1_TOKEN!).send({
      bookId: 3,
    });
    expect(res.status).toEqual(201);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'book', 'rentalDateAt', 'returnDateAt']));
  });

  test('PATCH /rentals/:rentalId', async () => {
    const res = await request(app).patch('/rentals/3').set('x-access-token', process.env.TEST_USER1_TOKEN!);
    expect(res.status).toEqual(200);
    expect(Object.keys(res.body)).toEqual(expect.arrayContaining(['id', 'book', 'rentalDateAt', 'returnDateAt']));
  });
});
