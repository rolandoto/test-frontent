const ENDPOINT ='http://localhost:4000/api/resecion/updatereservation'

const ServiceUpdateReservation =({id,data})=>{
    return fetch(`${ENDPOINT}/${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(resp =>{
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceUpdateReservation