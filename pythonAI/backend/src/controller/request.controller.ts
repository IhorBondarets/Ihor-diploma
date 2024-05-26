import { NextFunction, Request, Response } from "express";
import ApiError from "../helpers/error/ApiError";
import RequestService from "../services/request.service";
import path from "path";
import fs from "fs";
import fileUpload from "express-fileupload";
import { spawn } from "child_process";
import { IUser } from "../types/user.type";

export class RequestController {
  constructor(private requestService: RequestService) {}

  async create(req: Request, res: Response) {
    if (req.files && req.files.image && req.user) {
      const image = req.files.image as fileUpload.UploadedFile;
      const uniqueSuffix =
        req.user.id +
        "-" +
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        ".";
      const pathname = path.resolve(
        "./tmp",
        uniqueSuffix + image.mimetype.split("/")[1]
      );
      fs.writeFileSync(pathname, image.data);
      const scriptPathname = path.resolve("./python", "script.py");
      console.log(scriptPathname);
      const pythonProcess = spawn("python", [
        scriptPathname,
        pathname,
        "tmp/" + uniqueSuffix + "txt",
      ]);
      pythonProcess.stdout.on("data", async () => {
        const request = await this.requestService.create({
          image_name: uniqueSuffix + image.mimetype.split("/")[1],
          file_name: uniqueSuffix + "txt",
          userId: req.user?.id as string,
        });
        if(request) {
          return res.json(request)
          // res.writeHead(200, {
          //   "Content-Type": "application/octet-stream",
          //   "Content-Disposition": "attachment; filename=" + uniqueSuffix + "txt",
          // });
          // fs.createReadStream(path.resolve("./tmp", uniqueSuffix + "txt")).pipe(
          //   res
          // );
        }
      });
    } else {
      throw ApiError.conflict("No image provided");
    }
  }
  async findAll (req: Request, res: Response) {
    if(req.user){ 
      const requests = await this.requestService.getAllByUser(req.user?.id as string)
      return res.json({requests});
    }
    throw ApiError.notFound("No requests");
  }
  async getById (req: Request, res: Response) {
    const {id} = req.params;
    if(id) {
      const request = await this.requestService.getById(id)
      return res.json(request);
    }
    throw ApiError.notFound("No request");
  }
}
const requestController = new RequestController(new RequestService());
export default requestController;
