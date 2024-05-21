import toast from "react-hot-toast"
import { useAppDispatch } from "../hooks/redux"
import { loading,setGetHotelCloudbeds,setError,
        loadingbyHotel,
        setGetHotelCloudbedsByHotel,
        setErrorByHotel,
        loadingbyReservation,
        setGetHotelCloudbedsByReservation,
        setErrorByReservation} from "../reducers/ApiCloudbedsReducers"
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


    const getHotelGenalCloudbedsByHotel =async({id}) =>{
        dispatch(loadingbyHotel())
        try {
           const response =   await HttpClienteCloubeds.PostGetHotelCloudbedsByIdHotel({id})

           if(response){
            dispatch(setGetHotelCloudbedsByHotel(response)) 
            toast.success("exitoso")
           }else{
            dispatch(setErrorByHotel("no found"))
            toast.error("error")
           }
        } catch (error) {
            dispatch(setErrorByHotel("no found"))
            toast.error("error el el servicio",error)
        }
    }

    const getCloudbedsByReservation =async({id}) =>{
        dispatch(loadingbyReservation())
        try {
           const response = await HttpClienteCloubeds.PostGetResertvationbyHotel({id})
           console.log(response)
           if(response){
            dispatch(setGetHotelCloudbedsByReservation(response)) 
            toast.success("exitoso")
           }else{
            dispatch(setErrorByReservation("no found"))
            toast.error("error")
           }
        } catch (error) {
            dispatch(setErrorByReservation("no found"))
            toast.error("error el el servicio",error)
        }
    }

    return {getHotelGenalCloudbeds,
            getHotelGenalCloudbedsByHotel,
            getCloudbedsByReservation
    }

}

export default UseApiCloudbedsActions