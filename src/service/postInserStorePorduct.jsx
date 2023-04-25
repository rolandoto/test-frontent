import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/admin/postListProductAdminById/`

const postInserStorePorduct =({Cantidad,Nombre_Recepcion,ID})=>{
    return fetch(`${ENDPOINT}${ID}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({Cantidad,Nombre_Recepcion})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default postInserStorePorduct