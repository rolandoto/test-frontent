import {createSlice} from "@reduxjs/toolkit"

export const DEFAULT_STATE = {
    DetailDashboard:[],
    loading:false,
    error:null
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
         setError:(state,action) =>{
            state.loading= false
            state.error = action.payload
         }
    }
})

export const {loading,setDetailDashboard,setError} = DetailDasboardSlice.actions

export const selectDetailDashboard =(state) => state.stateDetailDashboard

export default DetailDasboardSlice.reducer