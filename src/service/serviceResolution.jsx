import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/updateresolution/1`


const ServiceResolution =({Resolucion})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({Resolucion})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceResolution

