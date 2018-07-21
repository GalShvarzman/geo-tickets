import {ITicket} from "../models/ticket";

const tickets:ITicket[] = [];

class TicketsDB {
    createNewTicket(ticket:ITicket){
        tickets.push(ticket);
        return ticket;
    }

    getAllTickets(){
        return [...tickets];
    }
}

const db = new TicketsDB();

export default db;
