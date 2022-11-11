import {createSlice} from "@reduxjs/toolkit"


export const initialState = {
    DetailDashboard:[],
    loading:false,
    error:null
}

export const DetailDasboardSlice = createSlice({
    name:"DetailDashboard",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading =true
            state.error = null
        },
        setDetailDashboard:(state,action) =>{
            state.DetailDashboard= action.payload
            state.loading = false
            console.log({"----payload":state.DetailDashboard})
         },
         setError:(state,action) =>{
            state.loading= false
            state.error = action.payload
         }
    }
})

export const {loading,setDetailDashboard,setError} = DetailDasboardSlice.actions

export const selectDetailDashboard =(state) => state.stateDetailDashboard

export default DetailDasboardSlice.reducer