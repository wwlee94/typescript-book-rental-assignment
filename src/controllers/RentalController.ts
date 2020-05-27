import { BodyParam, Get, HttpCode, HttpError, JsonController, Param, Patch, Post, Req, UseBefore } from 'routing-controllers';
import { Book } from '../entity/Book';
import { Rental } from '../entity/Rental';
import { JwtAuth } from '../middleware/JwtAuth';
import { RequestWithUser } from '../types';
import { BaseController } from './BaseController';

@JsonController()
@UseBefore(JwtAuth)
export class RentalController extends BaseController {
  // 특정 사용자가 가지고 있는 모든 대여 목록 가져옴
  @Get('/rentals')
  public async findUserBooks(@Req() req: RequestWithUser) {
    const user = req.user;
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');

    const rentals: Rental[] = await Rental.find({ where: { userId: user.id }, relations: ['book'] });
    if (rentals.length === 0) throw new HttpError(204);
    return rentals;
  }

  // 특정 사용자가 가지고 있는 특정 책의 대여 정보 가져옴
  @Get('/rentals/books/:bookId([0-9]+)')
  public async findUserBook(@Req() req: RequestWithUser, @Param('bookId') bookId: number) {
    const user = req.user;
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');

    const rental: Rental | undefined = await Rental.findOne({ where: { userId: user.id, bookId: bookId }, relations: ['book'] });
    if (!rental) throw new HttpError(404, '해당 유저에 대한 책 대여 정보를 찾을 수 없습니다.');
    return rental;
  }

  // 특정 사용자가 책을 대여함
  @HttpCode(201)
  @Post('/rentals')
  public async RentalBook(@Req() req: RequestWithUser, @BodyParam('bookId') bookId: number) {
    const user = req.user;
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');

    const book: Book | undefined = await Book.findOne(bookId);
    if (!book) throw new HttpError(404, '해당 책을 찾을 수 없습니다.');
    if (book.isRental) throw new HttpError(422, '이미 책이 대여 중입니다.');

    // 책을 대여 중인 상태로 변경
    book.isRental = true;
    await book.save();

    const rental = new Rental();
    rental.user = user;
    rental.book = book;
    return rental.save();
  }

  // 특정 사용자가 책을 반납함
  @Patch('/rentals/:id([0-9]+)')
  public async returnBook(@Param('id') rentalId: number) {
    const rental: Rental | undefined = await Rental.findOne({ where: { id: rentalId }, relations: ['book'] });
    if (!rental) throw new HttpError(404, '존재하지 않는 대여 기록입니다.');
    if (rental.returnDateAt) throw new HttpError(422, '이미 반납한 책입니다.');

    // 현재 시각으로 반납일 등록
    rental.returnDateAt = new Date();

    // 책은 반납 완료 상태로 변경
    rental.book.isRental = false;
    await rental.book.save();

    return rental.save();
  }
}
