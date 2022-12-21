import { useAppDispatch } from "../hooks/redux"
import { setTogleCheckingOpen,setTogleCheckingClose } from "../reducers/dashboardCheckingReducer"


const useDashboardCheckingAction =() =>{

    const dispatch= useAppDispatch()

    const toggleOpenDashboardChecking=() =>{
        dispatch(setTogleCheckingOpen())
    }

    const toggleCloseDashboardChecking =() =>{
        dispatch(setTogleCheckingClose())
    }

    return {
        toggleOpenDashboardChecking,
        toggleCloseDashboardChecking
    }

}
export default useDashboardCheckingAction