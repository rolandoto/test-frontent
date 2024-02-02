import {createSlice}  from "@reduxjs/toolkit"

export  const DEFAULT_STATE = {
    ListClient:[],
    Loanding:false,
    error:null
}

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).Dian : DEFAULT_STATE;
})();

export const DianSlice = createSlice({
    name:"Dian",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error=null
        },
        setClient:(state,action) =>{
            state.ListClient = action.payload
            state.loading = false
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {loading,setClient,setError} = DianSlice.actions

export default DianSlice.reducer