import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/insertcartstore`


const ServiceaInsertStore =({data})=>{
    return fetch(`${ENDPOINT}/`,{
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
export default ServiceaInsertStore