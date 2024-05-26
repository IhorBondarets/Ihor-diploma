
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { IUser } from '../types/user.type';
import UserService from '../services/user.service';
import ApiError from '../helpers/error/ApiError';
import { tokenGenerator, verify } from '../utils/jwt/jwt';

export class AuthController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { email, password}: IUser = req.body;
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);
    const user = await this.userService.createUser({ email, password: hasedPassword});
    const token = tokenGenerator(user);
    if (!user) {
      return next(ApiError.internal());
    } 
    return res.send({ token });
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password}: IUser = req.body;
    const user = await this.userService.findUser({ email });
    if ( bcrypt.compareSync(password, user.password)) {
      const token = tokenGenerator({...user, password: 'pass'});
      return res.send({ token });
    } 
    return next(ApiError.notFound('User not found'));
  }
  
}
const authController = new AuthController(new UserService());
export default authController;
