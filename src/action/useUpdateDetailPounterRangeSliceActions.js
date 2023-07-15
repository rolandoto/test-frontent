import {
    setUpdate,
    loading,
    setError,
  } from "../reducers/updateDatailPounterRangeReducer";
  import { useAppDispatch } from "../hooks/redux";
import HttpClient from "../HttpClient";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";

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
            }
            
        } catch (error) {
            dispatch(setError(true));
            Swal.fire({
                position: "center",
                icon: "error",
                title: "<p>Error</p>",
                showConfirmButton: false,
                timer: 3000,
              });
        }
    }
    return {
        postUpdateDetailPointerRange
    }
}
export default useUpdateDetailPounterRangeSliceActions