import { config } from "../config"

const ENDPOINT =`${config.serverRoute}/api/admin/updateProduct/`

const PostUpdateStoreProduct =({ID,Cantidad,ID_user,Price,Fecha})=>{
    return fetch(`${ENDPOINT}`,{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({ID,Cantidad,ID_user,Price,Fecha})
    }).then(resp =>{
        if(!resp.ok) throw new Error('Response is not ok')
        return resp.json()
    }).then(resp=>{
        return resp
    })
}
export default PostUpdateStoreProduct