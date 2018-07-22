import * as uuidv4 from 'uuid';

export interface ITicket {
    id:string,
    lat:number,
    lng:number
}

class Ticket implements ITicket{
    public id:string;
    public lat:number;
    public lng:number;

    constructor(lat:number, lng:number){
        this.id = uuidv4();
        this.lat = lat;
        this.lng = lng;
    }
}

export default Ticket;