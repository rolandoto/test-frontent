import {createSlice}  from "@reduxjs/toolkit"

export const  initialState = {
    DetailRoom:[],
    loading:false,
    error:null
}

export const RoomDetail = createSlice({
    name:"Room",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading = true
            state.error = null
        },
        setDetailRoom:(state,action) =>{
            state.DetailRoom = action.payload
            state.loading = false
            console.log({"-----payload":state.DetailRoom})
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {setDetailRoom,loading,setError} = RoomDetail.actions

export const selectDetailRoom = (state) => state.RoomDetail

export  default RoomDetail.reducer