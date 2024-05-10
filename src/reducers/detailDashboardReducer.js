import {createSlice} from "@reduxjs/toolkit"

export const DEFAULT_STATE = {
    DetailDashboard:[],
    loading:false,
    error:null,
    huesped:[],
    huepedValidInsert:[],
    loadingValiHuesped:false,
    errorValiHuesped:null,
    BreakFast:[]
}

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).DetailDashboard : DEFAULT_STATE;
})();

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