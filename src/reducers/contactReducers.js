import {createSlice} from "@reduxjs/toolkit"

const initialState={
    Contact:[],
    loading:false,
    error:null
}

export const ContactSlice = createSlice({
    name:"Contact",
    initialState,
    reducers:{
        loading:(state) =>{
            state.loading =true
            state.error = null
        },
        setContact:(state,action) =>{
            state.Contact =action.payload
            state.loading= false
            console.log({"---payload":state.Contact})
        },
        setError:(state,action) =>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const {loading,setContact,setError} = ContactSlice.actions

export default ContactSlice.reducer