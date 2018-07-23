import * as React from 'react';
import {ITicket} from "../App";
import Script from 'react-load-script';
import {IGoogle, IMarker} from "../infrastructure/google";

declare const google:IGoogle;

interface IMapContainerState {
    map?:{
        setCenter(position : {}):void,
        panTo(position : {})
    },
    markers:IMarker[];
    scriptLoaded:boolean
}

export interface IMapContainerProps {
    tickets:ITicket[]
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
            zoom: 13
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
        this.setState({markers: this.state.markers.concat([...markers])})
    };

    markerClickEventListener = (marker) => {
        let infoWindow = new google.maps.InfoWindow({
            content: `<p>Marker Location:${marker.getPosition()}</p>`
        });

        google.maps.event.addListener(marker, 'click', () => {
            this.state.map.panTo(marker.getPosition());
            infoWindow.open(this.state.map, marker);
        });
    };

    centerMarkerOnClick = (ticket:ITicket) => {
        const markersClone = [...this.state.markers];
        const selectedMarker = markersClone.find((marker:IMarker) => {
            return marker.position.lat() === ticket.lat && marker.position.lng() === ticket.lng;
        });
        if(selectedMarker){
            this.state.map.panTo(selectedMarker.getPosition());
        }
    };

    componentWillUnmount(){
        this.state.markers.forEach((marker)=>{
            google.maps.event.clearListeners(marker, 'click');
        });
    }

    onAddNewTicket = async(ticket:ITicket) => {
        return await this.addMarker(ticket);
    };

    onDeleteTicket = (ticketsToDeleteIds:ITicket[]) => {
        const tickets = [...this.props.tickets];
        let deletedTickets = tickets.filter((ticket:any)=>{
            return ticketsToDeleteIds.indexOf(ticket.id) !== -1
        });

        let markersClone = [...this.state.markers];
        for(let i = 0; i<markersClone.length; i++){
            const marker =  markersClone[i];
            const markerPosition = marker.position;
            const markerLat = markerPosition.lat();
            const marketLng = markerPosition.lng();
            const ticketIndex = deletedTickets.findIndex((ticket:ITicket)=>{
                return ticket.lat === markerLat && ticket.lng === marketLng;
            });
            if(ticketIndex !== -1){
                marker.setMap(null);
            }
        }
        this.setState({markers:markersClone});
    };

    createNewMarker = (lat, lng) => {
        const marker = new google.maps.Marker({
            position: {lat, lng},
            map: this.state.map
        });
        this.markerClickEventListener(marker);
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
