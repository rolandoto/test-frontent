import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    getHotel:[],
    loading:false,
    error:null
}

export const ApiCloudbedsReducersSlice = createSlice({
    name:"Cloudbeds",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading=true
            state.error= null
        },
        setGetHotelCloudbeds:(state,action) =>{
            state.getHotel = action.payload
            state.loading= false
        },
        setError:(state) =>{
            state.loading = false
            state.error = true
        }
    }
})

export const {loading,setGetHotelCloudbeds,setError} = ApiCloudbedsReducersSlice.actions

export default  ApiCloudbedsReducersSlice.reducer