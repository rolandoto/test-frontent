import {createSlice}  from "@reduxjs/toolkit"

export const  initialState = {
    Room:[],
    loading:false,
    error:null
}

export const RoomsSlice = createSlice({
    name:"Room",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading = true
            state.error = null
        },
        setRoom:(state,action) =>{
            state.Room = action.payload
            state.loading = false
            console.log({"-----payload":state.Room})
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {setRoom,loading,setError} = RoomsSlice.actions

export const selectPeople = (state) => state.Room

export  default RoomsSlice.reducer