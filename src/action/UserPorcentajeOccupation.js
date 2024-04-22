import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setOccupation,setError, loading } from "../reducers/OccupationPorcentajeReducers"
import { toast } from "react-hot-toast";

const UserPorcentajeOccupation =() =>{

    const dispatch =  useAppDispatch()

    const getOccupationPorcentaje =async({fecha,idHotel}) => {
        dispatch(loading());
        try {
            const Response =  await HttpClient.PostPorcentajeOccupation({fecha,idHotel})
            if(Response){
                dispatch(setOccupation(Response))
            }else{
                toast.error("Error en el servicio")
                dispatch(setError("error al peticion"))
            }
        } catch (error) {
            console.log(error)
            dispatch(setError("no found"))
            toast.error("Error en el servicio")
        }
    }
   
    return {getOccupationPorcentaje}

}

export default UserPorcentajeOccupation