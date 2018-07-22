import * as React from 'react';
import {ITicket} from "../App";
import TicketsList from "./tickets-list";
import './side-bar.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

interface ISideBarProps {
    onCreateTicket(ticket:ITicket):void,
    tickets:ITicket[],
    onDeleteTickets(ticketsToDeleteIds:string[]):void,
}

class SideBar extends React.PureComponent<ISideBarProps, {}>{
    public latRef:React.RefObject<HTMLInputElement>;
    public lngRef:React.RefObject<HTMLInputElement>;

    constructor(props:ISideBarProps){
        super(props);

        this.latRef = React.createRef();
        this.lngRef = React.createRef();
    }

    onClickSave = () => {
        let lat = Number.parseFloat(this.latRef.current!.value);
        let lng = Number.parseFloat(this.lngRef.current!.value);
        this.props.onCreateTicket({lat, lng});
        this.latRef.current.value = "";
        this.lngRef.current.value = "";
    };

    render(){
        return(
            <div className="side-bar">
                <h2 className="side-bar-create-new-ticket-header">Create new ticket</h2>
                <Input
                    className="side-bar-input"
                    type="number"
                    inputRef={this.latRef}
                    placeholder="Lat"
                    inputProps={{
                        'aria-label': 'Lat'
                    }}
                />
                <Input
                    className="side-bar-input"
                    type="number"
                    inputRef={this.lngRef}
                    placeholder="Lng"
                    inputProps={{
                        'aria-label': 'Lng'
                    }}
                />
                <Button className="save-btn" onClick={this.onClickSave} variant="outlined" color="primary">
                    Save
                </Button>
                <TicketsList onDeleteTickets={this.props.onDeleteTickets} tickets={this.props.tickets}/>
            </div>
        )
    }
}

export default SideBar;