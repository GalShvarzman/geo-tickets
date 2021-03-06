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

export function setTicketsAfterDelete(state:IState, action:any){
    let ticketsClone = [...state.tickets];
    ticketsClone = ticketsClone.filter((ticket)=>{
        return action.deletedTicketsIds.indexOf(ticket.id) === -1
    });
    return{
        ...state,
        tickets: ticketsClone
    }
}

export function setErrorMsg(state:IState, action:any){
    return{
        ...state,
        errorMsg:action.errorMsg
    }
}