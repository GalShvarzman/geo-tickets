import {ITicket} from "../App";
import {Dispatch} from "redux";
import {createNewTicket, deleteTickets, getAllTickets} from "../server-api";

export function onCreateNewTicket(ticket:ITicket):any{
    return async (dispatch:Dispatch) => {
        try {
            const newTicket = await createNewTicket(ticket);
            dispatch(setTicketsAfterCreateNewTicket(newTicket));
        }
        catch (e) {
            //fixme
        }
    }
}

export function onDeleteTickets(ticketsToDeleteIds:string[]):any {
    return async (dispatch: Dispatch) => {
        try{
            await deleteTickets(ticketsToDeleteIds);
            debugger;
            dispatch(setTicketsAfterDeleteTickets(ticketsToDeleteIds))
        }
        catch (e) {

        }
    }
}

export function loadAllTickets():any{
    return async (dispatch:Dispatch) => {
        try{
            const tickets = await getAllTickets();
            dispatch(setAllTickets(tickets));
        }
        catch (e) {
            //fixme
        }
    }
}

function setAllTickets(tickets:any){
    return {
        type: 'SET_ALL_TICKETS',
        tickets
    }
}

function setTicketsAfterCreateNewTicket(ticket:ITicket){
    return{
        type: 'SET_TICKETS_AFTER_CREATE_NEW_TICKET',
        ticket
    }
}

function setTicketsAfterDeleteTickets(deletedTicketsIds:string[]){
    return{
        type:'SET_TICKETS_AFTER_DELETE',
        deletedTicketsIds
    }
}