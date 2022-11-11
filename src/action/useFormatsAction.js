import { useDispatch } from "react-redux"
import HttpClient from "../HttpClient"
import { setFormats,loading,setError } from "../reducers/formatsReducers"

const useFormatsAction =() =>{

    const dispatch = useDispatch()

    const  getFormatsById =async({id}) =>{
        dispatch(loading())
        try {
            const response = await HttpClient.GetFormats(`id_hotel=${id}`)
            
            if(response){
                dispatch(setFormats(response))
            }else{
                dispatch(setError("Get no was no found"))
            }
        } catch (error) {
            dispatch(setError("Get no was no found"))
        }
    }

    return {
        getFormatsById       
    }
}
export default useFormatsAction