import toast from "react-hot-toast"
import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setDetailDashboard,setError,loading,setHuesped,loadingHuesped,setValidHuesped ,setErrorHuespedValid, setHuespedBreakfast} from "../reducers/detailDashboardReducer"

const useDetailDashboardAction =()=>{

    const dispatch = useAppDispatch()

    const  getDetailReservationById =async({id}) =>{
        dispatch(loading())
        try {
            
            const getResponse =  await HttpClient.GetDetailReservation(`getdetailreservation/${id}`)

            if(getResponse){
                dispatch(setDetailDashboard(getResponse.query))
            }else{
                dispatch(setError("Get with was found"))
            }
        } catch (error) {
            dispatch(setError("get whit no found"))
        }           
    }


    const  GetHuesped =async({id}) =>{
        dispatch(loading())
        try {
            const Response =  await HttpClient.GetHupedes({id})
            if(Response){
                dispatch(setHuesped(Response))
            }else{
                dispatch(setError("Get with was found"))
            }
        } catch (error) {
            dispatch(setError("get whit no found"))
        }           
    }


    const  PostInsertHuesped =async({ Id_user,id_huesped,Fecha,NumberDesayuno,Id_hotel,ID_Reserva}) =>{
        dispatch(loadingHuesped())
        try {
            const Response =  await HttpClient.PostRegisterHuespedBreafast({ Id_user,id_huesped,Fecha,NumberDesayuno,Id_hotel,ID_Reserva})
            console.log(Response)
            if(Response){
                dispatch(setValidHuesped(Response))
                toast.success("se exitoso")
            }else{
                dispatch(setErrorHuespedValid("Get with was found"))
                toast.error("error del servicio")
            }
        } catch (error) {
            dispatch(setErrorHuespedValid("get whit no found"))
            toast.error("Error en Huesped: " + error.message);
        }           
    }


    const  GetBreakHuespedBreaskfast =async({id}) =>{
        dispatch(loading())
        try {
            const Response =  await HttpClient.GetHupedesBraskfast({id})
            if(Response){
                dispatch(setHuespedBreakfast(Response))
            }else{
                dispatch(setError("Get with was found"))
                toast.error("error del servicio")
            }
        } catch (error) {
            dispatch(setError("get whit no found"))
            toast.error("Error en Huesped: " + error.message);
        }           
    }

    return {
        getDetailReservationById,
        GetHuesped,
        PostInsertHuesped,
        GetBreakHuespedBreaskfast
    }
}


export default useDetailDashboardAction
