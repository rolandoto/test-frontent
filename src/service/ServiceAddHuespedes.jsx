import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/handaddhuespe`

const ServiceAddHuespedes =({id,huespe,data,dataPay})=>{
    return fetch(`${ENDPOINT}/${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({huespe,data,dataPay})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default ServiceAddHuespedes