import { useDispatch } from "react-redux"
import HttpClient from "../HttpClient"
import { setInformeAll,loading,setError } from "../reducers/InformeDashboardReducers"


const useInformDashboardMetricas =() =>{

    const dispatch  = useDispatch()

    const PostByIdhotelInforme =async({id,fecha}) =>{
        dispatch(loading())
        try {
            const response = await  HttpClient.PostInformeInfomeMetricas({id,fecha})
            if(response){
                dispatch(setInformeAll(response))

            }else{
                dispatch(setError("get no found service"))
            }
            
        } catch (error) {
            dispatch(setError("no found"))
        }
    }

    return  {PostByIdhotelInforme}

}

export default useInformDashboardMetricas