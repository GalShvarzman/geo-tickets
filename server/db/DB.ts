import {ITicket} from "../models/ticket";

let tickets:ITicket[] = [];

class TicketsDB {
    createNewTicket(ticket:ITicket){
        tickets.push(ticket);
        return Promise.resolve(ticket);
    }

    async getAllTickets(){
        return Promise.resolve([...tickets]);
    }

    async deleteTickets(ticketsToDeleteIds:string[]){
        tickets = tickets.filter((ticket)=>{
            return ticketsToDeleteIds.indexOf(ticket.id) === -1
        });
        return Promise.resolve();
    }
}

const db = new TicketsDB();

export default db;
