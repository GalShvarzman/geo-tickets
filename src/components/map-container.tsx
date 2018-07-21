import * as React from 'react';

declare const google:any;

interface IMapContainerProps {

}

interface IMapContainerState {

}

class MapContainer extends React.Component<IMapContainerProps, IMapContainerState>{
    mapRef:any;

    constructor(props:IMapContainerProps){
        super(props);
        this.mapRef = React.createRef();
    }


    componentDidMount(){
        new google.maps.Map(this.mapRef, {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
        });
    }


    render() {
        return (
            <div id="map" ref={(element)=>{this.mapRef=element}}/>
        )
    }
}

export default MapContainer;
