import * as React from 'react';
import {ITicket} from "../App";
import Script from 'react-load-script';

declare const google:any;

interface IMapContainerProps {
    tickets:ITicket[]
}

interface IMapContainerState {
    map?:any,
    markers:any[];
    scriptLoaded:boolean
}

class MapContainer extends React.Component<IMapContainerProps, IMapContainerState>{
    mapRef:any;

    constructor(props:IMapContainerProps){
        super(props);
        this.state = {
            markers:[],
            scriptLoaded:false
        };
        this.mapRef = React.createRef();
    }


    loadMap = ()=>{
        let map = new google.maps.Map(this.mapRef, {
            center: {lat: 32.109333, lng: 34.855499},
            zoom: 8
        });

        this.setState({map}, ()=>{
            if(this.props.tickets.length){
                this.createMarkers();
            }
        })
    };

    shouldComponentUpdate(nextProps:IMapContainerProps, nextState:IMapContainerState) {
        return (nextState.scriptLoaded !== this.state.scriptLoaded && nextState.scriptLoaded == true)
    };

    componentDidUpdate(prevProps:IMapContainerProps, prevState:IMapContainerState){
        this.loadMap();
    }

    createMarkers = () => {
        const markers = this.props.tickets.map((ticket) => {
            return this.createNewMarker(ticket.lat, ticket.lng);
        });
        this.setState({markers: this.state.markers.concat([markers])})
    };

    markerEventListener = (marker) => {
        let infoWindow = new google.maps.InfoWindow({
            content: `<p>Marker Location:${marker.getPosition()}</p>`
        });

        google.maps.event.addListener(marker, 'click', (event) => {
            debugger;
            this.state.map.setCenter(marker.getPosition());
            infoWindow.open(this.state.map, marker);
        });
    };

    componentWillUnmount(){
        this.state.markers.forEach((marker)=>{
            google.maps.event.clearListeners(marker, 'click');
        });
    }

    onAddNewTicket = async(ticket:ITicket) => {
        debugger;
        return await this.addMarker(ticket);
    };

    onDeleteTicket = (ticketsToDeleteIds:ITicket[]) => {
        const tickets = [...this.props.tickets];
        let deletedTickets = tickets.filter((ticket:any)=>{
            return ticketsToDeleteIds.indexOf(ticket.id) !== -1
        });

        let markersClone = [...this.state.markers];
        for(let i = 0; i<markersClone.length; i++){
            const lat = markersClone[i].position.lat();
            const lng = markersClone[i].position.lng();
            const ticketIndex = deletedTickets.findIndex((ticket:ITicket)=>{
                return ticket.lat === lat && ticket.lng === lng;
            });
            if(ticketIndex !== -1){
                markersClone[i].setMap(null);
            }
        }
        this.setState({markers:markersClone});
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
        return new Promise((resolve, reject)=>{
            const marker = this.createNewMarker(ticket.lat, ticket.lng);
            this.state.map.setCenter(marker.getPosition());
            this.setState({markers:this.state.markers.concat([marker])}, ()=>{
                resolve(marker);
            });
        })
    };

    handleScriptLoad = () => {
        this.setState({ scriptLoaded: true })
    };

    render() {
        return (
            <>
                <Script onLoad={this.handleScriptLoad} url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6SbpqWyGf5b-_P6L-lSsNzxYEPz_cpPM&l&libraries=geometry,places"/>
                {this.state.scriptLoaded ? (<div id="map" ref={(element)=>{this.mapRef=element}}/>) : <h3>Loading...</h3>}
            </>
        )
    }
}

export default MapContainer;
