import * as express from 'express';
import * as routes from './routes';
import * as controllers from './controllers';

import {Request, Response} from "express";

const app = express();

app.use(express.json());

app.use('/tickets', routes.ticketsRouter);

app.get('/', (req:Request, res:Response) => res.send('Hello World!'));

app.use(controllers.errorHandlerController.errorHandler);

export default app;
