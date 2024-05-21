import toast from "react-hot-toast"
import { useAppDispatch } from "../hooks/redux"
import { loading,setGetHotelCloudbeds,setError} from "../reducers/ApiCloudbedsReducers"
import HttpClient from "../HttpClient"
import HttpClienteCloubeds from "../HttpClient/HttpClienteCloubeds"

const UseApiCloudbedsActions =() =>{    

    const dispatch =  useAppDispatch()

    const getHotelGenalCloudbeds =async() =>{
        dispatch(loading())
        try {
           const response =   await HttpClienteCloubeds.PostGetHotelCloudbeds()
           if(response){
            dispatch(setGetHotelCloudbeds(response)) 
            toast.success("exitoso")
           }else{
            dispatch(setError("no found"))
            toast.error("error")
           }
        } catch (error) {
            dispatch(setError("no found"))
            toast.error("error el el servicio",error)
        }
    }

    return {getHotelGenalCloudbeds}

}

export default UseApiCloudbedsActions