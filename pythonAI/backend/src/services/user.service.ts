import { User } from '../models/user.model';
import ApiError from '../helpers/error/ApiError';
import { IUser } from '../types/user.type';

export default class UserService {
  async createUser(body: IUser): Promise<IUser> {
    const {email, password} = body
    const find = await User.findOne({email});
    if(find){
      throw ApiError.conflict("User already exist");
    }
    const user = await User.create({ email, password });
    if (user) {
      return {id: user._id.toString(), email, password: 'pass'}
    }
    throw ApiError.conflict("Wrong data");
  }
  async findUser(body: {email: string}): Promise<IUser> {
    const {email} = body
    const user = await User.findOne({email});
    if(user){
      return {id: user._id.toString(), email, password: user.password}
    }
    throw ApiError.notFound("User not found");
  }
  async getUserById(id: string): Promise<IUser> {
    const user = await User.findOne({_id: id});
    if(user){
      return {id: user._id.toString(), email: user.email, password: 'pass'}
    }
    throw ApiError.notFound("User not found");
  }
}
