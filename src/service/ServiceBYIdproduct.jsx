import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/byIdProduct/`

const ServiceByIDProduct =({ID_producto,id})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({ID_producto})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceByIDProduct