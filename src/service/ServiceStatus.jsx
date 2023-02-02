import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/handupdatestatus/`


const ServiceStatus =({id,ID_Tipo_Estados_Habitaciones})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({ID_Tipo_Estados_Habitaciones})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceStatus

