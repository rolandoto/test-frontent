import {configureStore } from '@reduxjs/toolkit'
import listMotel from './slice/motelsSlice'
import loginSlice from './slice/LoginSlice'


const store = configureStore ({
    reducer:{
        listMotel,
        loginSlice
    }
})



export default store