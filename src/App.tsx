import * as React from 'react';
import './App.css';
import MapContainer from "./components/map-container";
import SideBar from "./components/side-bar";
import {IState} from "./state/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {onCreateNewTicket, onDeleteTickets} from "./state/actions";
import HeaderAppBar from './components/app-bar';

export interface ITicket {
    id?:string,
    lat:number,
    lng:number
}

interface IAppStateProps {
    tickets:ITicket[],
    errorMsg:string|null
}

interface IAppDispatchProps {
    onCreateNewTicket(ticket:ITicket):void,
    onDeleteTickets(ticketsToDeleteIds:string[]):void
}

type IAppProps = IAppStateProps & IAppDispatchProps;

class App extends React.Component<IAppProps, {}>{
    mapContainerRef:React.RefObject<any>;

    constructor(props:IAppProps){
        super(props);
        this.mapContainerRef = React.createRef();
    }

    public onCreateNewTicket = async(ticket:ITicket) => {
        const marker = await this.mapContainerRef.current.onAddNewTicket(ticket);
        ticket.lat = marker.position.lat();
        ticket.lng = marker.position.lng();
        this.props.onCreateNewTicket(ticket);
    };

    public onDeleteTickets = (ticketsToDeleteIds:string[])=>{
        this.props.onDeleteTickets(ticketsToDeleteIds);
        this.mapContainerRef.current.onDeleteTicket(ticketsToDeleteIds);
    };


    public render() {
        return (
            <div className="main">
                <div className="header">
                    <HeaderAppBar/>
                </div>
                <div className="App">
                    <div className="side-bar-left">
                         <SideBar errorMsg={this.props.errorMsg} onDeleteTickets={this.onDeleteTickets} tickets={this.props.tickets} onCreateTicket={this.onCreateNewTicket}/>
                    </div>
                    <div className="map-right">
                        <MapContainer tickets={this.props.tickets} ref={this.mapContainerRef}/>
                    </div>
                </div>
            </div>
        );
      }
}

const mapStateToProps = (state:IState, ownProps:any):IAppStateProps => {
    return {
        tickets: state.tickets,
        errorMsg: state.errorMsg
    }
};

const mapDispatchToProps = (dispatch:Dispatch, ownProps:any):IAppDispatchProps => {
    return {
        onCreateNewTicket : (ticket:ITicket) => {
            dispatch(onCreateNewTicket(ticket))
        },
        onDeleteTickets : (ticketsToDeleteIds:string[]) => {
            dispatch(onDeleteTickets(ticketsToDeleteIds))
        }
    }
};

export default connect<IAppStateProps, IAppDispatchProps>(mapStateToProps, mapDispatchToProps)(App);
