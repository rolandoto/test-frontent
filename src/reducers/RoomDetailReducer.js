import {createSlice}  from "@reduxjs/toolkit"

export const  initialState = {
    DetailRoom:[],
    loading:false,
    error:null,
    roomType:[],
    RoomTosell:[]
}



export const RoomDetail = createSlice({
    name:"Room",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading = true
            state.error = null
        },
        setRoomtype:(state,action) =>{
            state.roomType = action.payload
            state.loading = false
        },
        setRoomtoSell:(state,action) =>{
            state.RoomTosell = action.payload
            state.loading = false
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

export const {setDetailRoom,loading,setError,setRoomtype,setRoomtoSell} = RoomDetail.actions

export const selectDetailRoom = (state) => state.RoomDetail

export  default RoomDetail.reducer