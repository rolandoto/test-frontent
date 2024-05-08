import {createSlice} from "@reduxjs/toolkit"

export const initialState = {
    DetailDashboard:[],
    loading:false,
    error:null,
    huesped:[],
    huepedValidInsert:[],
    loadingValiHuesped:false,
    errorValiHuesped:null,
    BreakFast:[]
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
          
         },
         setHuesped:(state,action) =>{
            state.huesped= action.payload
            state.loading = false
         },
         setHuespedBreakfast:(state,action) =>{
            state.BreakFast= action.payload
            state.loading = false
         },
         setError:(state,action) =>{
            state.loading= false
            state.error = action.payload
         },
         setValidHuesped:(state,action) =>{
            state.huepedValidInsert=  action.payload
            state.loading = false
         },
         loadingHuesped:(state) =>{
            state.loading =true
            state.error = null
        },
        setErrorHuespedValid:(state) =>{
            state.loading =false
            state.error = null
        },
    }
})

export const {loading,setDetailDashboard,setError,setHuesped,setValidHuesped,loadingHuesped,setErrorHuespedValid,setHuespedBreakfast} = DetailDasboardSlice.actions

export const selectDetailDashboard =(state) => state.stateDetailDashboard

export default DetailDasboardSlice.reducer