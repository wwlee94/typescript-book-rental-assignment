import { Request } from 'express';
import { User } from '../entity/User';

export interface RequestWithUser extends Request {
  user?: User;
}
