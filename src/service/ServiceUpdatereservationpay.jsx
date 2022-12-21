const ENDPOINT ='http://localhost:4000/api/resecion/updateDetailPagos'

const ServiceUpdateReservationpay =({id,dataOne})=>{
    return fetch(`${ENDPOINT}/${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(dataOne)
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceUpdateReservationpay