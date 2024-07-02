import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    informe:[],
    loading:false,
    error:null
}

export const apiInformeAuditoriaSlice = createSlice({
    name:"InformeAuditoria",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setInformeAuditoria:(state,action) =>{
            state.informe = action.payload
            state.loading= false
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setTarifasReservation,setError} = apiInformeAuditoriaSlice.actions

export default  apiInformeAuditoriaSlice.reducer