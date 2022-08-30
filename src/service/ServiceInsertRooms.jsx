const ENDPOINT ='http://localhost:4000/api/admin/inserintoroomsadmin'

const ServiceInsertInto =({id_hotel,id_habitaciones,name_num})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({id_hotel,id_habitaciones,name_num})
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceInsertInto