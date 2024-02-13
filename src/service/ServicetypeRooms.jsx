import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/getTypeRoomsByIDHotelid_hotel`

const ServicetypeRooms =({id})=>{
    return fetch(`${ENDPOINT}/${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServicetypeRooms