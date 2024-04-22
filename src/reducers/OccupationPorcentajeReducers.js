import {createSlice}  from "@reduxjs/toolkit"

export const initialState = {
    occupation:[],
    loading:false,
    error:null
}


export const OccupationSlice =  createSlice({
    name:"OccupationPorcentajeSlice",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading =true
            state.error = null
        },
        setOccupation:(state,action) =>{
            state.occupation = action.payload
            state.loading = false
        },
        setError:(state,action) =>{
            state.loading= false
            state.error = action.payload 
        }
    }
})

export const {loading,setOccupation,setError} = OccupationSlice.actions


export default OccupationSlice.reducer