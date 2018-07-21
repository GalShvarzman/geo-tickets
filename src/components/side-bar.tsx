import * as React from 'react';
import {ITicket} from "../App";

interface ISideBarProps {
    onCreateTicket(ticket:ITicket):void
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
            <div>
                <label>Lat: </label><input ref={this.latRef} type="number"/>
                <label>Lng: </label><input ref={this.lngRef} type="number"/>
                <button onClick={this.onClickSave}>Save</button>
            </div>
        )
    }
}

export default SideBar;