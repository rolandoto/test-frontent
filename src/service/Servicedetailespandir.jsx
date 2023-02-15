import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/updatedetailreserva`

const Servicedetailespandir =({desde,hasta,desdeOne,habitaciones,ID_Habitaciones,id,dayOne,valor_dia_habitacion})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({desde,hasta,desdeOne,habitaciones,ID_Habitaciones,id,dayOne,valor_dia_habitacion})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default Servicedetailespandir