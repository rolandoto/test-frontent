const ENDPOINT ='https://grupo-hoteles.com/api/getTypeRoomsByIDHotel?id_hotel='


const ServicetypeRooms =({id})=>{
    return fetch(`${ENDPOINT}${id}`,{
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