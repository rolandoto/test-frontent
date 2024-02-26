import { useDispatch } from "react-redux"
import { setTraone,setTratwo,loading,setError } from "../reducers/pmstraReduccers"
import HttpClient from "../HttpClient"
import toast from "react-hot-toast"

const useTrapmsActions =() =>{

    const dispatch = useDispatch()

    const PostTrapmsone = async({body,token}) =>{
        dispatch(loading())
        try {
            const response= await HttpClient.PostRegisterTRA({body,token})
            console.log(response)
            if(response){
                dispatch(setTraone(response.responseData))
                toast.success("Enviado al tra")
                return response
            }else{
                dispatch(setError(false))
                toast.error("error al enviar al traPms")
            }
        } catch (error) {
            toast.error("error al enviar al traPms")
            dispatch(setError(true))
        }
    }

    const PostTrapmsTwo = async({body,token}) =>{
        dispatch(loading())
        try {
            const response= await HttpClient.PostRegisterTRATwo({body,token})
            console.log(response)
            if(response){
                dispatch(setTratwo(response.responseData))
                toast.success("Enviado huesped secundario")
                return response
            }else{
                dispatch(setError(false))
                toast.error("error Enviado huesped secundario")
            }
        } catch (error) {
            toast.error("error Enviado huesped secundario")
            dispatch(setError(true))
        }
    }

    return {
        PostTrapmsone,
        PostTrapmsTwo
    }

}

export default useTrapmsActions