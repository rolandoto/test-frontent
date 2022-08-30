const ENDPOINT ='https://grupohoteles.co/api/getHotelsByUser?id_user='

const ServiceHotels =({id})=>{
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
export default ServiceHotels