const ENDPOINT =`https://grupo-hoteles.com/api/informeconsolidado-pdf`

    const ServiceDescargar =({idUser})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },  
            body: JSON.stringify({idUser})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceDescargar