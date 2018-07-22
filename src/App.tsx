import * as React from 'react';
import './App.css';
import MapContainer from "./components/map-container";
import SideBar from "./components/side-bar";
import {IState} from "./state/store";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {onCreateNewTicket} from "./state/actions";

export interface ITicket {
    id?:string,
    lat:number,
    lng:number
}

interface IAppStateProps {
    tickets:ITicket[]
}


interface IAppDispatchProps {
    onCreateNewTicket(ticket:ITicket):void
}

type IAppProps = IAppStateProps & IAppDispatchProps;

class App extends React.Component<IAppProps, {}>{
    mapContainerRef:React.RefObject<any>;

    constructor(props:IAppProps){
        super(props);
        this.mapContainerRef = React.createRef();
    }

    public onCreateNewTicket = (ticket:ITicket) => {
        this.mapContainerRef.current.onAddNewTicket(ticket);
        this.props.onCreateNewTicket(ticket);
    };



    public render() {
        return (
            <div className="App">
                <div className="side-bar-left">
                     <SideBar tickets={this.props.tickets} onCreateTicket={this.onCreateNewTicket}/>
                </div>
                <div className="map-right">
                    <MapContainer tickets={this.props.tickets} ref={this.mapContainerRef}/>
                </div>
            </div>
        );
      }
}

const mapStateToProps = (state:IState, ownProps:any):IAppStateProps => {
    return {
        tickets: state.tickets
    }
};

const mapDispatchToProps = (dispatch:Dispatch, ownProps:any):IAppDispatchProps => {
    return {
        onCreateNewTicket : (ticket:ITicket) => {
            dispatch(onCreateNewTicket(ticket))
        }
    }
};

export default connect<IAppStateProps, IAppDispatchProps>(mapStateToProps, mapDispatchToProps)(App);
