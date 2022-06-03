import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoginService from "../../service/LoginService"
import { setLogin } from "../slice/LoginSlice"


const signIn =() =>{
    
    const login =({username,password,hotel}) =>{
        const t = LoginService({username,password,hotel}).then((jwt) =>{
            return jwt
        })
    }
    return {
        login
    }
}

export default signIn

