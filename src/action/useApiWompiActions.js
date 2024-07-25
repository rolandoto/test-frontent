import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setWompi,setError,loadingWompi } from "../reducers/ApiwompiReducers"

const useApiWompiActions =() =>{

    const dispatch = useAppDispatch()

    const getDetailPayment= async({id}) =>{
        dispatch(loadingWompi())
        try {
            const response  = await HttpClient.getDetailWompi({id})
            console.log(response)
            if(response){
                dispatch(setWompi(response))
            }else{
                dispatch(setError("get with was found"))
            }

        } catch (error) {
            dispatch(setError("get with was found"))
        }

    }
    return {
        getDetailPayment
    }

}

export default useApiWompiActions