import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    ocasional:[],
    loading:false,
    error:null,
    OcasionalMonth:[]
}

export const apiRoomsOcasional = createSlice({
    name:"ocasional",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setOcasional:(state,action) =>{
            state.ocasional = action.payload
            state.loading= false
            console.log({"---payload":state.ocasional})
        }, 
        setOcasionalRoom:(state,action) =>{
            state.OcasionalMonth = action.payload
            state.loading= false
            console.log({"---payload":state.ocasional})
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setOcasional,setError,setOcasionalRoom} = apiRoomsOcasional.actions

export default  apiRoomsOcasional.reducer