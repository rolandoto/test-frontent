import {configureStore } from '@reduxjs/toolkit'
import listMotel from './slice/motelsSlice'
import loginSlice from './slice/LoginSlice'
import listBooking  from "./slice"
import {FormatsSlice}  from "../reducers/formatsReducers"
import {RoomsSlice}  from "../reducers/roomsReducers"
import DashboardModalSlice from '../reducers/dashboardReducers'
import { StoreSlice } from '../reducers/storeReducers'
import { DetailDasboardSlice } from '../reducers/detailDashboardReducer'
import { BitacorasSlice } from '../reducers/bictacorasReducers'
import { ContactSlice } from '../reducers/contactReducers'

import RoomsModalCheckingSlice from '../reducers/dashboardCheckingReducer'
import { ForgetSlice } from '../reducers/forgetReducer'


const store = configureStore ({
    reducer:{
        //los nombres donde se llaman en el hooks
        listMotel,
        loginSlice,
        listBooking,
        Room:RoomsSlice.reducer,
        Dashboard:DashboardModalSlice.reducer,
        Checking:RoomsModalCheckingSlice.reducer,
        StoreAdmin:StoreSlice.reducer,
        DetailDashboard:DetailDasboardSlice.reducer,
        Bictacoras:BitacorasSlice.reducer,
        Formats:FormatsSlice.reducer,
        Contact:ContactSlice.reducer,
        Forget:ForgetSlice.reducer
    },
    devTools:true,
})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store
