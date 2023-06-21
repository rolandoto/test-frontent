import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    Items: [],

    loading:false,
    error:null
}

export const ReservationSlice = createSlice({
    name:"Formats",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading= true
            state.error = null
        },
        setReservation:(state,action) =>{
            state.Items =action.payload
            state.loading= false
            console.log({"---payload":state.entities})
        },
        setError:(state,action)=>{
            state.loading = false
            state.error =action.payload
        }
    }
})  

export const {loading,setFormats,setError} = ReservationSlice.actions

export default ReservationSlice.reducer