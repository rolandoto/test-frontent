

const ENDPOINT =`https://grupo-hoteles.com/api/postReporte-olvidos`

    const ServiceForget =({id_hotel,id_user,date,description,ubicacion})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },  
            body: JSON.stringify({id_hotel,id_user,date,description,ubicacion})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceForget