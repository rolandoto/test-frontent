import { useAppDispatch } from "../hooks/redux"
import { setToggleClose, setToggleOpen } from "../reducers/dashboardReducers"

const useDashboardAction =() =>{

    const dispatch = useAppDispatch()

    const toggleOpenDashBoard =() =>{
        dispatch(setToggleOpen())
    }

    const toggleCloseDashboard =() =>{
        dispatch(setToggleClose())
    }


    return {
        toggleOpenDashBoard,
        toggleCloseDashboard,
    }
}   

export default useDashboardAction