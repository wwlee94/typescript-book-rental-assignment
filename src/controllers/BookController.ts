import { Body, Delete, Get, HttpCode, HttpError, JsonController, Param, Post, Put, UseBefore } from 'routing-controllers';
import { Book } from '../entity/Book';
import { JwtAuth } from '../middleware/JwtAuth';
import { BaseController } from './BaseController';

@JsonController()
export class BookController extends BaseController {
  @Get('/books')
  public async getAll() {
    const books: Book[] = await Book.find();
    if (books.length === 0) throw new HttpError(204);
    return books;
  }

  @Get('/books/:id([0-9]+)')
  public async findBook(@Param('id') id: number) {
    const book: Book | undefined = await Book.findOne(id);
    if (!book) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);
    return book;
  }

  @UseBefore(JwtAuth)
  @HttpCode(201)
  @Post('/books')
  public async createBook(@Body({ validate: true }) book: Book) {
    return book.save();
  }

  @UseBefore(JwtAuth)
  @Put('/books/:id([0-9]+)')
  public async updateBook(@Param('id') id: number, @Body({ validate: true }) book: Book) {
    const updateBook: Book | undefined = await Book.findOne(id);
    if (!updateBook) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);

    if (book.name) updateBook.name = book.name;
    if (book.author) updateBook.author = book.author;
    return updateBook.save();
  }

  @UseBefore(JwtAuth)
  @Delete('/books/:id([0-9]+)')
  public async deleteBook(@Param('id') id: number) {
    const book: Book | undefined = await Book.findOne(id);
    if (!book) throw new HttpError(404, `해당 ${id}에 대한 책 정보를 찾을 수 없습니다.`);
    await book.remove();
    return { message: 'Success delete book!' };
  }
}
