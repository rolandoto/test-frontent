import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    wompi:[],
    loading:false,
    error:null
}

export const ApiwompiReducersSlice = createSlice({
    name:"wompi",
    initialState,
    reducers:{
        loadingWompi:(state) =>{
            state.loading=true
            state.error= null
        },
        setWompi:(state,action) =>{
            state.wompi = action.payload
            state.loading= false
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loadingWompi,setWompi,setError} = ApiwompiReducersSlice.actions

export default  ApiwompiReducersSlice.reducer