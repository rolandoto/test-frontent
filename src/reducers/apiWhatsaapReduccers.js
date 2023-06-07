import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    whatsapp:[],
    loading:false,
    error:null
}

export const apiWhataapSlice = createSlice({
    name:"Bictacoras",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setWhatsapp:(state,action) =>{
            state.whatsapp = action.payload
            state.loading= false
            console.log({"---payload":state.whatsapp})
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setWhatsapp,setError} = apiWhataapSlice.actions

export default  apiWhataapSlice.reducer