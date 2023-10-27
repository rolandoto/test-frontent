import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setOcasional,setError, loading } from "../reducers/apiRoomsOcasionalReducers"
import { toast } from "react-hot-toast";

const useRoomOcasional =() =>{

    const dispatch =  useAppDispatch()

    const postRoomOcasionalByID =async({ID_habitacion, Fecha,Time_ingreso,Time_salida,id_user,Hora_adicional,Persona_adicional,Tipo_forma_pago,Abono,ID_hotel}) =>{
        
        dispatch(loading())
        try {
            const postResponse = await  HttpClient.PostRoomsOcasional({ID_habitacion, Fecha,Time_ingreso,Time_salida,id_user,Hora_adicional,Persona_adicional,Tipo_forma_pago,Abono,ID_hotel})
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

    return {postRoomOcasionalByID}

}

export default useRoomOcasional