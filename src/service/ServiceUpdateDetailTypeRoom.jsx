import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/updateDetailReservaTypeRoom`


const ServiceUpdateDetailTypeRoom =({desde,hasta,ID_Habitaciones,id,ID_Tipo_habitaciones,RoomById})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({desde,hasta,ID_Habitaciones,id,ID_Tipo_habitaciones,RoomById})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceUpdateDetailTypeRoom

