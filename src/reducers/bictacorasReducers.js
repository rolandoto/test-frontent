import {createSlice} from "@reduxjs/toolkit"

export const DEFAULT_STATE ={
    Bitacoras:[],
    loading:false,
    error:null
}

const initialState = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).Bictacoras : DEFAULT_STATE;
})();

export const BitacorasSlice = createSlice({
    name:"Bictacoras",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setBictacoras:(state,action) =>{
            state.Bitacoras = action.payload
            state.loading= false
            console.log({"---payload":state.Bitacoras})
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setBictacoras,setError} = BitacorasSlice.actions

export default  BitacorasSlice.reducer