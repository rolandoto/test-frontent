import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    checkingDasboardVisible:false
}

const RoomsModalCheckingSlice = createSlice({
    name:"roomCheckingModal",
    initialState,
    reducers:{
        setTogleCheckingOpen:(state) =>{
            state.checkingDasboardVisible = true
        },
        setTogleCheckingClose:(state) =>{
            state.checkingDasboardVisible = false
        }
    }
})

export const {setTogleCheckingOpen,setTogleCheckingClose} = RoomsModalCheckingSlice.actions

export const selectDashboardChecking = (state) => state.Checking   

export default RoomsModalCheckingSlice