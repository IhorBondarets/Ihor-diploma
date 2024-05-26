import { IUser } from "./user.type";

export interface IRequest {
    id?: string;
    user: IUser;
    image_name: string;
    text_file: string;
  }