import { createSlice } from "@reduxjs/toolkit";

export const MotelsList = createSlice({
    name:"ListMotel",
    initialState:{
        list:[]
    },
    reducers:{
        setList:(state,action)=>{
            state.list = action.payload
        }
    }
})

export const {setList} =  MotelsList.actions

export default MotelsList.reducer



