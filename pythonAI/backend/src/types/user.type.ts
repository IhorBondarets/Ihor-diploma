import { ObjectId } from "mongoose";

export interface IUser {
    id?: string;
    email: string;
    password: string;
  }