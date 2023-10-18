import {configureStore, createAsyncThunk } from '@reduxjs/toolkit'
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
import { RoomDetail } from '../reducers/RoomDetailReducer'
import { apiWhataapSlice } from '../reducers/apiWhatsaapReduccers'
import { UpdateDetailPounterSlice } from '../reducers/updateDatailPounterReducer'
import { UpdateDetailPounterRangeSlice } from '../reducers/updateDatailPounterRangeReducer'
import { ReservationSlice } from '../reducers/ReservationReducers'
import { apiTarifasReservationSlice } from '../reducers/apiPostTarifasReservation'
import { searchSlice } from '../reducers/searchUsersReducers'

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export const fetchDataFromApi = createAsyncThunk(
    'data/fetchData',
    async () => {
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();
      return data;
    }
  );
  
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
        Forget:ForgetSlice.reducer,
        RoomDetail:RoomDetail.reducer,
        apiWhataap:apiWhataapSlice.reducer,
        updateDetailPounter:UpdateDetailPounterSlice.reducer,
        UpdateDetailPounterRangeSlice:UpdateDetailPounterRangeSlice.reducer,
        ReservationSlice:ReservationSlice.reducer,
        TarifasReservation:apiTarifasReservationSlice.reducer,
        SearchUsers:searchSlice.reducer
    },
    devTools:true,
    middleware: [persistanceLocalStorageMiddleware],
})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store
