import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    InformeMonth:[],
    loadingDashboard:false,
    errorDashboard:null
}

export const InformeDashboardSlice = createSlice({
    name:"initail",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loadingDashboard=true
            state.errorDashboard= null
        },
        setInformeAll:(state,action) =>{
            state.InformeMonth = action.payload
            state.loadingDashboard= false
        },
        setError:(state) =>{
            state.loadingDashboard = false
            state.errorDashboard = true
        }
    }
})

export const {loading,setInformeAll,setError} = InformeDashboardSlice.actions

export default  InformeDashboardSlice.reducer