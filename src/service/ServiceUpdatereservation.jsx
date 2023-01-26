import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/updatereservation`

const ServiceUpdateReservation =({id,data})=>{
    return fetch(`${ENDPOINT}/${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceUpdateReservation