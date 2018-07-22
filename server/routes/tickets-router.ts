import * as express from 'express';
import * as controllers from "../controllers";

export const ticketsRouter = express.Router();

ticketsRouter.post('/', controllers.ticketsController.createNewTicket);

ticketsRouter.get('/', controllers.ticketsController.getAllTickets);

ticketsRouter.delete('/', controllers.ticketsController.deleteTickets);