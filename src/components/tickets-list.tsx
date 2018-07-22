import * as React from 'react';
import {ITicket} from "../App";
import './tickets-list.css';

interface ITicketsListProps {
    tickets:ITicket[]
}

class TicketsList extends React.PureComponent<ITicketsListProps,{}>{
    constructor(props:ITicketsListProps){
        super(props)
    }

    render(){
        const list = this.props.tickets.map((ticket)=>{
            return <li key={ticket.id}>{ticket.lat}, {ticket.lng}</li>
        });

        return(
            <div>
                <h2>My Tickets</h2>
                <ul className="tickets-list-ul">{list}</ul>
            </div>
        )
    }
}

export default TicketsList;