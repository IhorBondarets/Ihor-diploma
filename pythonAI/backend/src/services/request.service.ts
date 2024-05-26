import { IUser } from "../types/user.type";
import ApiError from "../helpers/error/ApiError";
import { IRequest } from "../types/request.type";
import { User } from "../models/user.model";
import { Request } from "../models/request.model";

export default class RequestService {
  async create(body: {
    image_name: string;
    file_name: string;
    userId: string;
  }): Promise<IRequest> {
    const { image_name, file_name, userId } = body;
    const user = await User.findOne({ _id: userId });
    if (user) {
      const request = await Request.create({
        user: user,
        text_file: file_name,
        image_name: image_name,
      });
      if (request) {
        return {
          id: request._id.toString(),
          image_name:
            `http://${process.env.HOST}:${process.env.PORT}/static/` +
            request.image_name,
          text_file:
            `http://${process.env.HOST}:${process.env.PORT}/static/` +
            request.text_file,
          user: { id: user._id.toString(), password: "pass", email: user.email},
        };
      }
      throw ApiError.internal();
    }
    throw ApiError.notFound("Account not found");
  }
  async getAllByUser(userId: string): Promise<IRequest[]> {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const requests = await Request.find({ user });
      if (requests) {
        return requests.map((request) => {
          return {
            id: request._id.toString(),
            image_name:
              `http://${process.env.HOST}:${process.env.PORT}/static/` +
              request.image_name,
            text_file:
              `http://${process.env.HOST}:${process.env.PORT}/static/` +
              request.text_file,
            user: {
              id: user._id.toString(),
              password: "pass",
              email: user.email,
            },
          };
        });
      }
    }
    throw ApiError.notFound("Requests not found");
  }
  async getById(requestId: string): Promise<IRequest> {
    const request = await Request.findOne({ _id: requestId });
    if (request) {
      return {
        id: request._id.toString(),
        image_name:
          `http://${process.env.HOST}:${process.env.PORT}/static/` +
          request.image_name,
        text_file:
          `http://${process.env.HOST}:${process.env.PORT}/static/` +
          request.text_file,
        user: { id: request.user?._id.toString(), password: "pass", email: "" },
      };
    }
    throw ApiError.notFound("Requests not found");
  }
}
