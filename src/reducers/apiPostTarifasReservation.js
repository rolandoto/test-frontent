import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    tarifas:[],
    loading:false,
    error:null
}

export const apiTarifasReservationSlice = createSlice({
    name:"Tarifas",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setTarifasReservation:(state,action) =>{
            state.tarifas = action.payload
            state.loading= false
            console.log({"---payload":state.tarifas})
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setTarifasReservation,setError} = apiTarifasReservationSlice.actions

export default  apiTarifasReservationSlice.reducer