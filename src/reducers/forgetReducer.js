import {createSlice}  from "@reduxjs/toolkit"


export  const initialState = {
    forget:[],
    loading:false,
    error:null
}


export const ForgetSlice = createSlice({
    name:"Forget",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error=null
        },
        setForget:(state,action) =>{
            state.forget = action.payload
            state.loading = false
            console.log({"---payload":state.forget})
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {loading,setForget,setError} = ForgetSlice.actions

export default ForgetSlice.reducer