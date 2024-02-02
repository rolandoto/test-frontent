import { useDispatch } from "react-redux"
import { setForget,loading,setError } from "../reducers/forgetReducer"
import HttpClient from "../HttpClient"

const useForgetAction =() =>{

    const dispatch = useDispatch()

    const getForgetById = async({id}) =>{
        dispatch(loading())
        try {
            const response= await HttpClient.getForget(`id_hotel=${id}`)
            if(response){
                dispatch(setForget(response))
            }else{
                dispatch(setError("get no was no found"))
            }
        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }


    return {
        getForgetById
    }

}

export default useForgetAction