import { useCallback, useContext, useState } from "react"
import AutoProvider from "../privateRoute/AutoProvider"
import LoginService from "../service/LoginService"
import {useHistory} from 'react-router-dom'
import cookie from "react-cookies";

import { setLogin } from "../store/slice";
import { useDispatch } from "react-redux";
import HttpClient from "../HttpClient";

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
    const {jwt,setJwt,isOpen, setIsOpen,setDian} = useContext(AutoProvider)
    const dispatch = useDispatch()

    const login = useCallback(({username,password,hotel}) =>{
        setState({loading:true,error:false})
        HttpClient.PostAutenticationDian().then(e =>{
            setDian(e)
            localStorage.setItem('tokenDian',JSON.stringify(e))
        })

        LoginService({username,password,hotel}).then(index =>{
            localStorage.setItem('jwt',JSON.stringify(index))
            createCookie("user", index);
            setIsOpen(true)
            setJwt(index)
            dispatch(setLogin(index.result.id_user))
            setState({loading:true,error:false})
           
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


