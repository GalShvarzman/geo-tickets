import {Request, Response,NextFunction} from "express";
import * as services from '../services';

class TicketsController{

    async createNewTicket(req:Request, res:Response, next:NextFunction){
        tryCatch(next, async()=>{
            res.status(201).json(await services.ticketsService.createNewTicket(req.body));
        })
    }

    async getAllTickets(req:Request, res:Response, next:NextFunction){
        tryCatch(next, async()=>{
            res.status(200).json(await services.ticketsService.getAllTickets());
        })
    }

    async deleteTickets(req:Request, res:Response, next:NextFunction){
        tryCatch(next, async()=>{
            await services.ticketsService.deleteTickets(req.body);
            res.status(204).send();
        })
    }
}

async function tryCatch(next:NextFunction, func:Function){
    try {
        return await func();
    }
    catch (err) {
        next(err);
    }
}

const ticketsController = new TicketsController();

export default ticketsController;