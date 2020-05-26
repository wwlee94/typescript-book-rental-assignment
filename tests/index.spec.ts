import request from 'supertest';
import app from '../src/App';
import databaseConn, { closeDatabaseConn } from '../src/database/databaseConn';
import { Book } from '../src/entity/Book';
import { Rental } from '../src/entity/Rental';
import { User } from '../src/entity/User';
import { userBooksPayload, userPayload } from '../src/utils/util';
import '../tests/features/Auth.spec';
import '../tests/features/Book.spec';
import '../tests/features/Rental.spec';
import '../tests/features/User.spec';

beforeAll(async () => {
  await databaseConn();

  // create user1,2 & token update
  let i = 1;
  for (const payload of userPayload) {
    await request(app).post('/users').send({
      email: payload.email,
      password: payload.password,
      passwordConfirm: payload.password,
    });
    const res = await request(app).post('/login').send(payload);
    process.env[`TEST_USER${i}_TOKEN`] = res.body.token;
    i++;
  }

  // create books
  const books: Book[] = [];
  for (const payload of userBooksPayload) {
    const book = new Book();
    book.name = payload.name;
    book.author = payload.author;
    await book.save();
    books.push(book);
  }

  // create rental relation -> user1 rental all books
  const user = await User.findOne(1);
  for (let i = 0; i < 2; i++) {
    const rental = new Rental();
    rental.user = user!;
    rental.book = books[i];
    await rental.save();
  }
});

afterAll(async () => {
  await closeDatabaseConn();
});
