import { useDispatch } from "react-redux"
import HttpClient from "../HttpClient"
import { setContact,loading,setError } from "../reducers/contactReducers"


const useContactAction =() =>{

    const dispatch  = useDispatch()

    const getContactById= async({id}) =>{
        dispatch(loading())
        try {
            const response =await HttpClient.GetContact(`id_hotel=${id}`)

            if(response){
                dispatch(setContact(response))
            }else{
                dispatch(setError("get with was found"))
            }
        } catch (error) {
            dispatch(setError("get with was found"))
        }
    }

    return {
        getContactById
    }

}

export default useContactAction