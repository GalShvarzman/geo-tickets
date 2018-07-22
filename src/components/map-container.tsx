import * as React from 'react';
import {ITicket} from "../App";

declare const google:any;

interface IMapContainerProps {
    tickets:ITicket[]
}

interface IMapContainerState {
    map?:any,
    markers:any[];
}

class MapContainer extends React.Component<IMapContainerProps, IMapContainerState>{
    mapRef:any;

    constructor(props:IMapContainerProps){
        super(props);
        this.state = {
            markers:[]
        };
        this.mapRef = React.createRef();
    }


    componentDidMount(){
        let map = new google.maps.Map(this.mapRef, {
            center: {lat: 32.109333, lng: 34.855499},
            zoom: 8
        });

        this.setState({map})
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.tickets !== this.props.tickets)
    };

    componentDidUpdate(){
        if(this.props.tickets.length !== this.state.markers.length){
            const markers = this.props.tickets.map((ticket) => {
                return this.createNewMarker(ticket.lat, ticket.lng);
            });
            this.setState({markers: this.state.markers.concat([markers])})
        }
    }

    markerEventListener = (marker) => {
        let infoWindow = new google.maps.InfoWindow({
            content: `<p>Marker Location:${marker.getPosition()}</p>`
        });

        google.maps.event.addListener(marker, 'click', (event) => {
            this.state.map.setCenter(marker.getPosition());
            infoWindow.open(this.state.map, marker);
        });
    };

    componentWillUnmount(){
        google.maps.event.clearListeners('marker', 'click');
    }

    onAddNewTicket = (ticket:ITicket) => {
        return this.addMarker(ticket);
    };

    createNewMarker = (lat, lng) => {
        const marker = new google.maps.Marker({
            position: {lat, lng},
            map: this.state.map
        });
        this.markerEventListener(marker);
        return marker;
    };

    addMarker = (ticket:ITicket) => {
        const marker = this.createNewMarker(ticket.lat, ticket.lng);
        //this.state.map.panTo({lat:ticket.lat, lng:ticket.lng});
        this.state.map.setCenter(marker.getPosition());

        this.setState({markers:this.state.markers.concat([marker])})
    };


    render() {
        return (
            <div id="map" ref={(element)=>{this.mapRef=element}}/>
        )
    }
}

export default MapContainer;
