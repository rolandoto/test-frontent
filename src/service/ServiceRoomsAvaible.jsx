const ENDPOINT ='http://localhost:4000/api/resecion/roomsavaible'

    const ServiceRoomsAviable =({desde,hasta,habitaciones,ID_Habitaciones})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({desde,hasta,habitaciones,ID_Habitaciones})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceRoomsAviable