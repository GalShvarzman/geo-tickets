import {IState} from "./store";

export function setTicketsAfterCreateNewTicket(state:IState, action:any){
    return{
        ...state,
        tickets:state.tickets.concat([action.ticket])
    }
}

export function setAllTickets(state:IState, action:any){
    return{
        ...state,
        tickets:action.tickets
    }
}