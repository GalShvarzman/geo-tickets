import * as React from 'react';
import {ITicket} from "../App";
import TicketsList from "./tickets-list";
import './side-bar.css';

interface ISideBarProps {
    onCreateTicket(ticket:ITicket):void,
    tickets:ITicket[]
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
    };

    render(){
        return(
            <div className="side-bar">
                <div className="input-wrapper">
                    <label>Lat: </label><input ref={this.latRef} type="number"/>
                </div>
                <div className="input-wrapper">
                    <label>Lng: </label><input ref={this.lngRef} type="number"/>
                </div>
                <button className="save-btn" onClick={this.onClickSave}>Save</button>

                <TicketsList tickets={this.props.tickets}/>
            </div>
        )
    }
}

export default SideBar;