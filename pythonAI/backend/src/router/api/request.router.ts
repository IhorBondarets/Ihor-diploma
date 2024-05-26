import { Router } from "express";
import { wrapper } from "../../middlewares/ctrlWrapper";
import requestController from "../../controller/request.controller";
import { isAuth } from "../../middlewares/isAuth";

const requestRouter: Router = Router();

requestRouter.post(
  "/",
  isAuth(),
  wrapper(requestController.create.bind(requestController))
);
requestRouter.get(
  "/",
  isAuth(),
  wrapper(requestController.findAll.bind(requestController))
);
requestRouter.get(
  "/:id",
  wrapper(requestController.getById.bind(requestController))
);

export default requestRouter;
