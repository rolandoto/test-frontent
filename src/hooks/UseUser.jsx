import { useCallback, useContext, useState } from "react"
import AutoProvider from "../privateRoute/AutoProvider"
import LoginService from "../service/LoginService"
import {useHistory} from 'react-router-dom'
import cookie from "react-cookies";

import { setLogin } from "../store/slice";
import { useDispatch } from "react-redux";

function createCookie(name, value) {
    cookie.save(name, value, { path: "/" });
}

export function getCookie(name) {
    return cookie.load(name);
}

function deleteCookie(name) {
    cookie.remove(name, { path: "/" });
}

const UseUsers =() =>{
    const history = useHistory()
    const [state,setState] = useState({loading:false,error:false})
    const {jwt,setJwt} = useContext(AutoProvider)
    const dispatch = useDispatch()

    const login = useCallback(({username,password,hotel}) =>{
        setState({loading:true,error:false})
        LoginService({username,password,hotel}).then(index =>{
            localStorage.setItem('jwt',JSON.stringify(index))
            createCookie("user", index);
            setJwt(index)
            dispatch(setLogin(index.result.id_user))
            setState({loading:true,error:false})
            setTimeout(() =>{
               
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
        isError:state.error,
        jwt,
    
    }
}

export default UseUsers


