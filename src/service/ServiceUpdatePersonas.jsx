import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/postdetailupdate`

const ServiceUpdatePersonas =({id,data})=>{
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
export default ServiceUpdatePersonas