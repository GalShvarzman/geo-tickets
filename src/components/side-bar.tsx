import * as React from 'react';
import {ITicket} from "../App";
import TicketsList from "./tickets-list";
import './side-bar.css';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {store} from "../state/store";
import {setErrorMsg} from "../state/actions";
import MapContainer from "./map-container";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

interface ISideBarProps {
    onCreateTicket(ticket:ITicket):void,
    tickets:ITicket[],
    onDeleteTickets(ticketsToDeleteIds:string[]):void,
    errorMsg:string|null,
    mapRef:React.RefObject<MapContainer>
}

interface ISideBarState {
    lat:string,
    lng:string
}

class SideBar extends React.PureComponent<ISideBarProps, ISideBarState>{

    constructor(props:ISideBarProps){
        super(props);
        this.state = {
            lat:"",
            lng:""
        };
    }

    onClickSave = () => {
        let lat = Number.parseFloat(this.state.lat);
        let lng = Number.parseFloat(this.state.lng);
        this.props.onCreateTicket({lat, lng});
        this.setState({lat:"", lng:""});
    };

    componentWillUnmount(){
        store.dispatch(setErrorMsg(null));
    }

    handleChange = (field:string, value:string) => {
        this.setState((prevState)=>{
            return{
                ...prevState,
                [field] : value
            }
        })
    };

    isValid = () => {
         return this.isLatValid() && this.isLngValid();
    };

    isLatValid = () => {
        return (/^(-?\d+(\.\d+)?)$/).test(this.state.lat);
    };

    isLngValid = () => {
        return (/^(-?\d+(\.\d+)?)$/).test(this.state.lng);
    };

    render(){
        const isLatValid = this.isLatValid();
        const isLatDirty = !!this.state.lat.length;
        const isLngValid = this.isLngValid();
        const isLngDirty = !!this.state.lng.length;
        const isButtonEnabled = this.isValid();

        return(
            <div className="side-bar">
                <h2 className="side-bar-create-new-ticket-header">Create new ticket</h2>
                <FormControl className='form-control' error={isLatDirty && !isLatValid} aria-describedby="lat-error-text">
                    <InputLabel className="side-bar-input-label" htmlFor="lat">Lat</InputLabel>
                    <Input
                        id="lat"
                        className="side-bar-input"
                        value={this.state.lat}
                        type="text"
                        onChange={(e)=>{this.handleChange('lat', e.target.value)}}
                        inputProps={{
                            'aria-label': 'Lat'
                        }}
                    />
                    <FormHelperText id="lat-error-text" hidden={!isLatDirty || isLatValid}>Invalid lat</FormHelperText>
                </FormControl>
                <FormControl className='form-control' error={isLngDirty && !isLngValid} aria-describedby="lng-error-text">
                    <InputLabel className="side-bar-input-label" htmlFor="lng">Lng</InputLabel>
                    <Input
                        id="lng"
                        className="side-bar-input"
                        value={this.state.lng}
                        type="text"
                        onChange={(e)=>{this.handleChange('lng', e.target.value)}}
                        inputProps={{
                            'aria-label': 'Lng'
                        }}
                    />
                    <FormHelperText id="lng-error-text" hidden={!isLngDirty || isLngValid}>Invalid lng</FormHelperText>
                </FormControl>

                <Button disabled={!isButtonEnabled} className="save-btn" onClick={this.onClickSave} variant="outlined" color="primary">
                    Save
                </Button>
                <p className="side-bar-error-msg" hidden={!this.props.errorMsg}>{this.props.errorMsg}</p>
                <TicketsList mapRef={this.props.mapRef} onDeleteTickets={this.props.onDeleteTickets} tickets={this.props.tickets}/>
            </div>
        )
    }
}

export default SideBar;