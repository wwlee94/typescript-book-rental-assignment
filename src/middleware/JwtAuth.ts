import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';

export class JwtAuth implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'];
    if (!token) return res.json(new UnauthorizedError('로그인을 위한 토큰이 없습니다.'));

    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, info: any) => {
      if (err) return res.json(new UnauthorizedError('인증에 실패했습니다.'));
      return next();
    });
  }
}
