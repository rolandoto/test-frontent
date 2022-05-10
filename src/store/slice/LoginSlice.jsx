import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    username:"",
    password:"",
    hotel:"",
    signInUser:false,
    token:""
}

export const LoginSlice = createSlice({
    name:"Login",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.email = action.payload.username;
            state.signInUser = true;
        }
    }
})

export const {setLogin} = LoginSlice.actions

export default LoginSlice.reducer