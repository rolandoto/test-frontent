import {createSlice} from "@reduxjs/toolkit"

export const initialState ={
    getHotel:[],
    loading:false,
    error:null,
    getHotelByHotel:[],
    loadingByHotel:false,
    errorByHotel:null,
    getHotelByReservation:[],
    loadingByReservation:false,
    errorByReservation:null,
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
        },
        loadingbyHotel:(state) =>{
            state.loadingByHotel=true
            state.errorByHotel= null
        },
        setGetHotelCloudbedsByHotel:(state,action) =>{
            state.getHotelByHotel = action.payload
            state.loadingByHotel= false
        },
        setErrorByHotel:(state) =>{
            state.loadingByHotel = false
            state.errorByHotel = true
        },
        loadingbyReservation:(state) =>{
            state.loadingByReservation=true
            state.errorByReservation= null
        },
        setGetHotelCloudbedsByReservation:(state,action) =>{
            state.getHotelByReservation = action.payload
            state.loadingByReservation= false
        },
        setErrorByReservation:(state) =>{
            state.loadingByReservation = false
            state.errorByReservation = true
        }
    }
})

export const {  loading,
                setGetHotelCloudbeds,
                setError,
                loadingbyHotel,
                setGetHotelCloudbedsByHotel,
                setErrorByHotel,
                loadingbyReservation,
                setGetHotelCloudbedsByReservation,
                setErrorByReservation} = ApiCloudbedsReducersSlice.actions

export default  ApiCloudbedsReducersSlice.reducer