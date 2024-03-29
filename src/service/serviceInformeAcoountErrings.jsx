import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/resecion/informeAccount/`


const serviceInformeAcoountErrings =({id,fecha})=>{
    return fetch(`${ENDPOINT}${id}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },  
        body: JSON.stringify({fecha})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default serviceInformeAcoountErrings
