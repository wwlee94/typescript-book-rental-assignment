import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface, NotFoundError, UnauthorizedError } from 'routing-controllers';
import { User } from '../entity/User';
import { RequestWithUser } from '../types';

export class JwtAuth implements ExpressMiddlewareInterface {
  use(req: RequestWithUser, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'];
    if (!token) return res.status(401).send(new UnauthorizedError('로그인을 위한 토큰이 없습니다.'));

    jwt.verify(token, process.env.JWT_SECRET_KEY!, async (err: any, info: any) => {
      if (err || !info.id) return res.status(401).send(new UnauthorizedError('인증에 실패했습니다.'));

      const id = info.id;
      const user = await User.findOne({ where: { id } });
      if (!user) return res.status(404).send(new NotFoundError('존재하지 않는 사용자입니다.'));

      req.user = user;
      return next();
    });
  }
}
