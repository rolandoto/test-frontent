

const ENDPOINT =`https://grupo-hoteles.com/api/postBitacoraByIDHotel?id_hotel=`

const ServiceBictacoras =({id,id_user,date,time,lugar,description})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({id_user,date,time,lugar,description})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceBictacoras