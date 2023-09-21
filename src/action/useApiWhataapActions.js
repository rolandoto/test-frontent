import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setWhatsapp,setError,loading } from "../reducers/apiWhatsaapReduccers"
import { toast } from "react-hot-toast";

const useApiWhataapActions =() =>{

    const dispatch = useAppDispatch()

    const postWhataapById =async({plantilla,to,languaje,name,url}) =>{
        dispatch(loading())
        try {

            const postResponse =  await HttpClient.postApiWhasatapp({plantilla,to,languaje,name,url})

            if(postResponse){
                dispatch(setWhatsapp(postResponse))
            }else{
                dispatch(setError("get no was  found"))
            }

        } catch (error) {
            dispatch(setError("get no was no found"))
        }
    }

    const postWhataapByIdCheckout =async({plantilla,to,name,hotel,factura}) =>{
        dispatch(loading())
        try {
            const postResponse =  await HttpClient.postApiWhasatappCheckout({plantilla,to,name,hotel,factura})

            if(postResponse){
                console.log("hotel")
            }else{
                console.log("error")
            }

        } catch (error) {
            console.log("error")
        }
    }

    const postWhataapByIdSolicitud = async({to}) =>{
        try {
            const postResponse = await  HttpClient.postApiWhasatappSolicitud({to})
            console.log(postResponse)
            if(postResponse){
               
            }else{
                
            }
        } catch (error) {
            console.log("error")
        }
    }

    return {
        postWhataapById,
        postWhataapByIdCheckout,
        postWhataapByIdSolicitud
    }
}


export default useApiWhataapActions