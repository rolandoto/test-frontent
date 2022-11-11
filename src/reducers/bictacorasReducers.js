import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    Bitacoras:[],
    loading:false,
    error:null
}


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