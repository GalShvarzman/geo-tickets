import {ITicket} from "../models/ticket";

const tickets:ITicket[] = [];

class TicketsDB {
    async createNewTicket(ticket:ITicket){
        tickets.push(ticket);
        return ticket;
    }

    async getAllTickets(){
        return [...tickets];
    }
}

const db = new TicketsDB();

export default db;
