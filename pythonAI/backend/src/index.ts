import bodyParser from 'body-parser';
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import dotenv from "dotenv";
import cookies from 'cookie-parser';

import AppRouter from './router/router';
import {connectDB} from './config/database';
import errorHandler from './middlewares/ErrorHandler';
import fileUpload from 'express-fileupload';
import { JWTStrategy } from './utils/strategies/passport';
import { IUser } from './types/user.type';

declare global {
    namespace Express {
      interface User extends IUser {}
    }
  }


const app = express();
const router = new AppRouter(app);
dotenv.config();

// Connect to mongoDB
connectDB();

// Express configuration
app.set('port', process.env.PORT || 4200);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookies());
app.use(fileUpload({
    // useTempFiles : true,
    // tempFileDir : './tmp'
}));
app.use('/static', express.static('tmp'))
app.use(JWTStrategy);
router.init();
const port = app.get('port');
app.use(errorHandler);

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server started on port ${port}`));

export { server };