import bcrypt from 'bcrypt';
import { Body, Delete, Get, HttpCode, HttpError, InternalServerError, JsonController, Param, Post, UseBefore } from 'routing-controllers';
import { User } from '../entity/User';
import { JwtAuth } from '../middleware/JwtAuth';
import { BaseController } from './BaseController';

@JsonController()
export class UserController extends BaseController {
  @UseBefore(JwtAuth)
  @Get('/users')
  public async getAll() {
    const users: User[] = await User.find();
    if (users.length === 0) throw new HttpError(204);
    return users;
  }

  @UseBefore(JwtAuth)
  @Get('/users/:id([0-9]+)')
  public async findUser(@Param('id') id: number) {
    const user: User | undefined = await User.findOne(id);
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
  @Delete('/users/:id([0-9]+)')
  public async deleteUser(@Param('id') id: number) {
    const user: User | undefined = await User.findOne(id);
    if (!user) throw new HttpError(404, '해당 사용자를 찾을 수 없습니다.');
    await user.remove();
    return { message: 'Success delete book!' };
  }
}
