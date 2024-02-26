import {createSlice}  from "@reduxjs/toolkit"

export const  initialState = {
    validaTraone:[],
    validaTratwo:[],
    loading:false,
    error:false
}

export const PmstraSlice = createSlice({
    name:"Room",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading = true
            state.error = null
        },
        setTraone:(state,action) =>{
            state.validaTraone = action.payload
            state.loading = false
            console.log({"-----payload":state.validaTraone})
        },
        setTratwo:(state,action) =>{
            state.validaTratwo = action.payload
            state.loading = false
            console.log({"-----payload":state.validaTratwo})
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {setTraone,setTratwo,loading,setError} = PmstraSlice.actions

export const selectPeople = (state) => state.Trapms

export  default PmstraSlice.reducer