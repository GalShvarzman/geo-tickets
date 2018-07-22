import db from '../db/DB';
import {ITicket} from "../models/ticket";
import Ticket from '../models/ticket';

class TicketsService{

    async createNewTicket(ticket:ITicket){
        return await db.createNewTicket(new Ticket(ticket.lat, ticket.lng));
    }

    async getAllTickets(){
        return await db.getAllTickets();
    }

    async deleteTickets(ticketsToDeleteIds:string[]){
        return await db.deleteTickets(ticketsToDeleteIds)
    }
}

const ticketsService = new TicketsService();

export default ticketsService;