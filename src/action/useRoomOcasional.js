import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setOcasional,setError, loading,setOcasionalRoom } from "../reducers/apiRoomsOcasionalReducers"
import { toast } from "react-hot-toast";

const useRoomOcasional =() =>{

    const dispatch =  useAppDispatch()

    const postRoomOcasionalByID =async({ID_habitacion, Fecha,Time_ingreso,Time_salida,id_user,Hora_adicional,Persona_adicional,Tipo_forma_pago,Abono,ID_hotel,Fecha_today}) =>{
        
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.PostRoomsOcasional({ID_habitacion, Fecha,Time_ingreso,Time_salida,id_user,Hora_adicional,Persona_adicional,Tipo_forma_pago,Abono,ID_hotel,Fecha_today})
            toast.success("Exitoso")
            if(postResponse){
                dispatch(setOcasional(postResponse))
            }else{
                dispatch(setError("post with wans found"))
                toast.error("Error ")
            }

        } catch (error) {
            dispatch(setError("post with wans found"))
            toast.error("Error")
        }
        
    }


    const postRoomOcasionalMonth =async({fecha,id}) =>{
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.PostRoomOcasionalMonth({fecha,id})
            if(postResponse){
                dispatch(setOcasionalRoom(postResponse))
                toast.success("Exitoso ")
            }else{
                dispatch(setError("post with wans found"))
                toast.error("Error ")
            }

        } catch (error) {
            dispatch(setError("post with wans found"))
            toast.error("Error")
        }
        
    }


    return {postRoomOcasionalMonth,postRoomOcasionalByID}

}

export default useRoomOcasional