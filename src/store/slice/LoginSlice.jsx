import {createSlice} from '@reduxjs/toolkit'


const jst = JSON.parse(sessionStorage.getItem('jwt'))
console.log(jst)
export const LoginSlice = createSlice({
    name:"Login",
    initialState:{
        jwt:null,
        token:jst
    },
    reducers:{
        setLogin:(state,action)=>{
            state.jwt = action.payload
        }
    }
})

export const {setLogin} = LoginSlice.actions

export default LoginSlice.reducer