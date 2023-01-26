import { config } from "../config"

    const ENDPOINT = `${config.serverRoute}/api/auth/login`

    const LoginService =({username,password,hotel})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({username,password,hotel})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default LoginService