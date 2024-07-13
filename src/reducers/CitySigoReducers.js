import {createSlice} from "@reduxjs/toolkit"

const initialState={
    City:[],
    loading:false,
    error:null
}

export const CitySigoSlice = createSlice({
    name:"CitySigoSlice",
    initialState,
    reducers:{
        loadingCitySigo:(state) =>{
            state.loading =true
            state.error = null
        },
        setCitySigo:(state,action) =>{
            state.City =action.payload
            state.loading= false
        },
        setErrorCitySigo:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {loadingCitySigo,setCitySigo,setErrorCitySigo} = CitySigoSlice.actions

export default CitySigoSlice.reducer