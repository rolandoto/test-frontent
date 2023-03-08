import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/handCleanRoom/`

const ServiceBlockRoom =({id,desde,hasta,ID_Habitaciones,ID_Tipo_Estados_Habitaciones,Nombre})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({desde,hasta,ID_Habitaciones,ID_Tipo_Estados_Habitaciones,Nombre})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceBlockRoom