import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    entities: [],
    loading:false,
    error:null
}

export const FormatsSlice = createSlice({
    name:"Formats",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading= true
            state.error = null
        },
        setFormats:(state,action) =>{
            state.entities =action.payload
            state.loading= false
            console.log({"---payload":state.entities})
        },
        setError:(state,action)=>{
            state.loading = false
            state.error =action.payload
        }
    }
})  

export const {loading,setFormats,setError} = FormatsSlice.actions

export default FormatsSlice.reducer