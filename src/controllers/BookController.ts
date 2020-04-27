// eslint-disable-next-line prettier/prettier
import { Body, Delete, Get, HttpCode, HttpError, JsonController, Param, Post, Put } from 'routing-controllers';
import { Book } from '../entity/Book';
import { BaseController } from './BaseController';

@JsonController()
export class BookController extends BaseController {
  @Get('/books')
  public async getAll() {
    const books: Book[] = await Book.find();
    if (books.length === 0) throw new HttpError(400, '책 정보를 찾을 수 없습니다.');
    return books;
  }

  @Get('/books/:id')
  public async findBook(@Param('id') id: number) {
    // ? id가 string이 들어올 때 Error 처리
    const book: Book | undefined = await Book.findOne(id);
    if (!book) throw new HttpError(400, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);
    return book;
  }

  @HttpCode(201)
  @Post('/books')
  public async createBook(@Body() book: Book) {
    if (!book.name) throw new HttpError(400, '책 이름이 없습니다.');
    if (!book.author) throw new HttpError(400, '책 저자가 없습니다.');
    return book.save();
  }

  @Put('/books/:id')
  public async updateBook(@Param('id') id: number, @Body() book: Book) {
    // ? id가 string이 들어올 때 Error 처리
    const updateBook: Book | undefined = await Book.findOne(id);
    if (!updateBook) throw new HttpError(400, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`); // 값이 없는 것도 throw Error를 발생 시키는 건지?
    if (book.name) updateBook.name = book.name;
    if (book.author) updateBook.author = book.author;
    return updateBook.save();
  }

  @Delete('/books/:id')
  public async deleteBook(@Param('id') id: number) {
    // ? id가 string이 들어올 때 Error 처리
    return await Book.delete(id);
  }
}
