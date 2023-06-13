import HttpClient from "../HttpClient"
import { useAppDispatch } from "../hooks/redux"
import { setUpdate,loading,setError } from "../reducers/updateDatailPounterReducer"

const useUpdateDetailPointerActions =() =>{

    const dispatch = useAppDispatch()

    const postUpdateDetailPointer=async({id,Fecha_final})=>{
        dispatch(loading())
        try {
            const response =  await HttpClient.postUpdatailPounter({id,Fecha_final})
            if(response){
                dispatch(setUpdate(response))
            }else {
                dispatch(setError("Post with wasn found"))
            }
        } catch (error) {
            dispatch(setError("Post with wasn found"))
        }
    }

    return {
        postUpdateDetailPointer
    }


}

export default useUpdateDetailPointerActions