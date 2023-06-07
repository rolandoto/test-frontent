import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setWhatsapp,setError,loading } from "../reducers/apiWhatsaapReduccers"

const useApiWhataapActions =() =>{

    const dispatch = useAppDispatch()

    const postWhataapById =async({plantilla,to,languaje}) =>{
        dispatch(loading())
        try {

            const postResponse =  await HttpClient.postApiWhasatapp({plantilla,to,languaje})

            if(postResponse){
                dispatch(setWhatsapp(postResponse))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    return {
        postWhataapById
    }
}


export default useApiWhataapActions