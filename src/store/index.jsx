import {configureStore } from '@reduxjs/toolkit'
import listMotel from './slice/motelsSlice'
import loginSlice from './slice/LoginSlice'
import bictacoras from './slice/Bictacoras'
import listFormats from "./slice/ListFormats"
import listBooking  from "./slice"

const store = configureStore ({
    reducer:{
        //los nombres donde se llaman en el hooks
        listMotel,
        loginSlice,
        bictacoras,
        listFormats,
        listBooking,
    },
    devTools:true,
})
export default store
