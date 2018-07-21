import {ITicket} from "../App";
import {Dispatch} from "redux";
import {createNewTicket, getAllTickets} from "../server-api";

export function onCreateNewTicket(latAndLng:ITicket):any{
    return async (dispatch:Dispatch) => {
        try {
            await createNewTicket(latAndLng);
            dispatch(setTicketsAfterCreateNewTicket(latAndLng))
        }
        catch (e) {
            //fixme
        }
    }
}

export function loadAllTickets(){
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

function setAllTickets(tickets:ITicket[]){
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