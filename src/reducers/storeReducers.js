import {createSlice}  from "@reduxjs/toolkit"

export const DEFAULT_STATE = {
    Store:[],
    loading:false,
    error:null
}


const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).StoreAdmin : DEFAULT_STATE;
})();

export const StoreSlice =  createSlice({
    name:"StoreAdmin",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading =true
            state.error = null
        },
        setStore:(state,action) =>{
            state.Store = action.payload
            state.loading = false
            console.log({"-----payload":state.Store})
        },
        setError:(state,action) =>{
            state.loading= false
            state.error = action.payload 
        }
    }
})

export const {loading,setStore,setError} = StoreSlice.actions

export const selectStore =(state) => state.StoreAdmin

export default StoreSlice.reducer