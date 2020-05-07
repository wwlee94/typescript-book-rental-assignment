import { Body, Delete, Get, HttpCode, HttpError, JsonController, Param, Post, Put } from 'routing-controllers';
import { Book } from '../entity/Book';
import { BaseController } from './BaseController';

@JsonController()
export class BookController extends BaseController {
  @Get('/books')
  public async getAll() {
    const books: Book[] = await Book.find();
    if (books.length === 0) throw new HttpError(204);
    return books;
  }

  @Get('/books/:id')
  // @OnUndefined(404)
  public async findBook(@Param('id') id: number) {
    if (!id) throw new HttpError(400, 'id는 number 타입입니다.');

    const book: Book | undefined = await Book.findOne(id);
    if (!book) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);
    return book;
  }

  @HttpCode(201)
  @Post('/books')
  public async createBook(@Body({ validate: true }) book: Book) {
    // if (!book.name) throw new HttpError(422, '책 이름이 없습니다.');
    // if (!book.author) throw new HttpError(422, '책 저자가 없습니다.');
    return book.save();
  }

  @Put('/books/:id')
  public async updateBook(@Param('id') id: number, @Body({ validate: true }) book: Book) {
    if (!id) throw new HttpError(400, 'id는 number 타입입니다.');

    const updateBook: Book | undefined = await Book.findOne(id);
    if (!updateBook) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);

    if (book.name) updateBook.name = book.name;
    if (book.author) updateBook.author = book.author;
    return updateBook.save();
  }

  @Delete('/books/:id')
  public async deleteBook(@Param('id') id: number) {
    if (!id) throw new HttpError(400, 'id는 number 타입입니다.');

    const book: Book | undefined = await Book.findOne(id);
    if (!book) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);
    await book.remove();
    return 'Success Delete Book !';
  }
}
