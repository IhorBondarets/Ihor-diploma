import { Router } from 'express';

import authController from '../../controller/auth.controller';
import { wrapper } from '../../middlewares/ctrlWrapper';
import validation from '../../middlewares/validation';
import userRegisterSchema from '../../helpers/joiSchemas/user.register.schema';
import userAuthSchema from '../../helpers/joiSchemas/user.auth.schema';

const authRouter: Router = Router();

authRouter.post(
  '/register',
  validation(userRegisterSchema),
  wrapper(authController.register.bind(authController))
);
authRouter.post(
  '/login',
  validation(userAuthSchema),
  wrapper(authController.login.bind(authController))
);

export default authRouter;