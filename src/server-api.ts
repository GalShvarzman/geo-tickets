import {ITicket} from "./App";
import {request} from "./utils/request";

export async function createNewTicket(ticket:ITicket){
    return await post('/tickets', ticket)
}

export async function getAllTickets(){
    return await get('/tickets');
}

function get(url:string){
    return request(url)
    .then(response => response.json())
}

function post(url:string, data:any){
    return request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
}