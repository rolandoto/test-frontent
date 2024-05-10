import {
    setUpdate,
    loading,
    setError,
  } from "../reducers/updateDatailPounterRangeReducer";
  import { useAppDispatch } from "../hooks/redux";
import HttpClient from "../HttpClient";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const useUpdateDetailPounterRangeSliceActions =() =>{

    const dispatch = useAppDispatch()

    const postUpdateDetailPointerRange =  async({desde,hasta,ID_Habitaciones,id,ID_estado_habiatcion}) =>{
        dispatch(loading());
        try {
            const response  = await HttpClient.postUpdatailPounterRange({desde,hasta,ID_Habitaciones,id,ID_estado_habiatcion})
            if(response){
                dispatch(setUpdate(response))
                confetti({
                    zIndex: 999,
                    particleCount: 100,
                    spread: 70,
                    origin: { x: 0.5, y: 0.8 },
                  });
            }else{
                toast.error("Error en el servicio")
                setError("Error")
            }
            
        } catch (error) {
            setError("Error")
            toast.error("Error al cambiar de habitacion")
        }
    }
    return {
        postUpdateDetailPointerRange
    }
}
export default useUpdateDetailPounterRangeSliceActions