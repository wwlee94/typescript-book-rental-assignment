import bcrypt from 'bcrypt';
import { Body, Delete, Get, HttpCode, HttpError, InternalServerError, JsonController, Post, Req, UseBefore } from 'routing-controllers';
import { User } from '../entity/User';
import { JwtAuth } from '../middleware/JwtAuth';
import { RequestWithUser } from '../types';
import { BaseController } from './BaseController';

@JsonController()
export class UserController extends BaseController {
  @UseBefore(JwtAuth)
  @Get('/users')
  public async findUser(@Req() req: RequestWithUser) {
    const user = req.user;
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');
    return user;
  }

  @HttpCode(201)
  @Post('/users')
  public async createUser(@Body({ validate: true }) user: User) {
    if (user.password !== user.passwordConfirm) throw new HttpError(400, '패스워드를 다시 확인해주세요.');

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS)).catch(err => {
      throw new InternalServerError(err.message);
    });
    const hashPassword = await bcrypt.hash(user.password, salt).catch(err => {
      throw new InternalServerError(err.message);
    });
    user.password = hashPassword;
    delete user.passwordConfirm;
    return user.save();
  }

  @UseBefore(JwtAuth)
  @Delete('/users')
  public async deleteUser(@Req() req: RequestWithUser) {
    const user = req.user;
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');
    await user.remove();
    return { message: 'Success delete user!' };
  }
}
