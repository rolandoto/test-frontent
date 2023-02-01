
const ENDPOINT =`https://grupo-hoteles.com/api/postCancelUpdate`


    const ServiceUpdateReservationWeb =({id,cancelado })=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },  
            body: JSON.stringify({id,cancelado})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
export default ServiceUpdateReservationWeb

