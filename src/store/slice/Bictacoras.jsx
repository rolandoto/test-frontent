import {createSlice} from "@reduxjs/toolkit"


export const Bictacoras = createSlice({
    name:"ListBictacoras",
    initialState:{
        bicta:[]
    },
    reducers:{
        setBitca:(state,action) =>{
            state.bicta = action.payload
        }
    }
})

export const {setBitca} = Bictacoras.actions

export default Bictacoras.reducer

