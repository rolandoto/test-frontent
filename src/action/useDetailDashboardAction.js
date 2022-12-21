import { useAppDispatch } from "../hooks/redux"
import HttpClient from "../HttpClient"
import { setDetailDashboard,setError,loading } from "../reducers/detailDashboardReducer"

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
            dispatch(setError("get with was found"))
        }           
    }

    return {
        getDetailReservationById
    }
}


export default useDetailDashboardAction
