import {configureStore } from '@reduxjs/toolkit'
import listMotel from './slice/motelsSlice'
import loginSlice from './slice/LoginSlice'
import bictacoras from './slice/Bictacoras'


const store = configureStore ({
    reducer:{
        //los nombres donde se llaman en el hooks
        listMotel,
        loginSlice,
        bictacoras
    },
    devTools:true,
})

export default store