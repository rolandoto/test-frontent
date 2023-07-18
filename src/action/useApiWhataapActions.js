import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setWhatsapp,setError,loading } from "../reducers/apiWhatsaapReduccers"

const useApiWhataapActions =() =>{

    const dispatch = useAppDispatch()

    const postWhataapById =async({plantilla,to,languaje,name}) =>{
        dispatch(loading())
        try {

            const postResponse =  await HttpClient.postApiWhasatapp({plantilla,to,languaje,name})

            if(postResponse){
                dispatch(setWhatsapp(postResponse))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    const postWhataapByIdCheckout =async({plantilla,to,languaje,name,hotel}) =>{
        dispatch(loading())
        try {

            const postResponse =  await HttpClient.postApiWhasatappCheckout({plantilla,to,languaje,name,hotel})

            if(postResponse){
                console.log("hotel")
            }else{
                console.log("error")
            }

        } catch (error) {
            console.log("error")
        }
    }

    return {
        postWhataapById,
        postWhataapByIdCheckout
    }
}


export default useApiWhataapActions