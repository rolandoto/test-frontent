import { useCallback, useContext, useState } from "react"
import AutoProvider from "../privateRoute/AutoProvider"
import LoginService from "../service/LoginService"
import { setLogin } from "../store/slice/LoginSlice"
import {useHistory} from 'react-router-dom'

const UseUsers =() =>{
    const history = useHistory()
    const [state,setState] = useState({loading:false,error:false})
    const {jwt,setJwt} = useContext(AutoProvider)
    
    const login = useCallback(({username,password,hotel}) =>{
        setState({loading:false,error:false})
        LoginService({username,password,hotel}).then(index =>{
            sessionStorage.setItem('jwt',JSON.stringify(index))
            setJwt(index)
            setState({loading:true,error:false})
            setTimeout(() =>{
                history.push('/home')
            },3000)
        }).catch((e) =>{
            console.log('no entro')
            console.error(e)
            setState({loading:false,error:true})
        })
    },[setJwt])

    return {
        login,
        isLogin:Boolean(jwt),
        isLoading:state.loading,
        isError:state.error
    }

}

export default UseUsers


