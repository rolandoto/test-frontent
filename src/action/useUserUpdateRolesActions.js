import { useDispatch } from "react-redux"
import {setUpdateRoles, loading,setError } from "../reducers/UserUpdateRolesReducers"
import HttpClient from "../HttpClient"
import toast from "react-hot-toast"


const useUserUpdateRolesActions =() =>{

    const dispatch = useDispatch()

    const postUserUpdateRolesById = async({id_permissions,id}) =>{
            dispatch(loading())
        try {
            const response = await HttpClient.PostUpdateUserRoles({id_permissions,id})
            console.log(response)
            if(response){
                dispatch(setUpdateRoles(response))
                toast.success("exito al cambiar de rol")
            }else {
                dispatch(setError("Post with wasn found"))
                toast.error("error al cambia de rol")
            }

        } catch (error) {
            dispatch(setError("Post with wasn found"))
            toast.error("error al servicio")
        }
    }

    return {postUserUpdateRolesById}

}

export default useUserUpdateRolesActions