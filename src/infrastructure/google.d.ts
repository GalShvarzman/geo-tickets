export interface IMarker{
    getPosition():{},
    position : {
        lat():number,
        lng():number
    },
    setMap(v?:any):void
}

interface IMap {
    (el:any , options : {
        center: {lat: number, lng:number},
        zoom: number
    }) : void
}

export interface IGoogle {
    maps : {
        Map: IMap,
        InfoWindow(options: { content: string }): void,
        event: {
            addListener(marker: IMarker, name: string, cb: () => void),
            clearListeners(marker: IMarker, event: string)
        },
        Marker(any): void
    }
}