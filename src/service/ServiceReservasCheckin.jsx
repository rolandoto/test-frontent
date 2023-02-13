import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/reservaschecking/`

const ServiceReservationCheckin =({id})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({id})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceReservationCheckin

