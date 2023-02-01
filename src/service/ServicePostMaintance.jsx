
const ENDPOINT =`https://grupo-hoteles.com/api/postMantenimiento?id_hotel=`


const ServicePostMaintance =({id,id_user_recepcion,id_user_mantenimiento,startDate,room,novelty,options})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({id_user_recepcion,id_user_mantenimiento,startDate,room,novelty,options})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServicePostMaintance

