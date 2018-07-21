import {IState} from "./store";
import {setAllTickets, setTicketsAfterCreateNewTicket} from "./functions";

const options = {
    'SET_TICKETS_AFTER_CREATE_NEW_TICKET' : setTicketsAfterCreateNewTicket,
    'SET_ALL_TICKETS' : setAllTickets
};

export function reducer(state:IState, action:any){
    const handler = options[action.type];
    if(handler){
        return handler(state, action);
    }
    return state;
}