import {ITicket} from "../models/ticket";

let tickets:ITicket[] = [];

class TicketsDB {
    async createNewTicket(ticket:ITicket){
        tickets.push(ticket);
        return ticket;
    }

    async getAllTickets(){
        return [...tickets];
    }

    async deleteTickets(ticketsToDeleteIds:string[]){
        tickets = tickets.filter((ticket)=>{
            return ticketsToDeleteIds.indexOf(ticket.id) === -1
        });
    }
}

const db = new TicketsDB();

export default db;
