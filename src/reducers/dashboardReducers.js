import {createSlice}  from "@reduxjs/toolkit"

export const initialState = {
    dashboardVisible:false
}

const RoomsModalSlice = createSlice({
    name:"rooModal",
    initialState,
    reducers:{
        setToggleOpen:(state) => {
            state.dashboardVisible = true
        },
        setToggleClose:(state) =>{
            state.dashboardVisible = false
        }
    }
})

export const {setToggleOpen,setToggleClose} = RoomsModalSlice.actions

export const selectDashboard = (state) => state.Dashboard   

export default RoomsModalSlice