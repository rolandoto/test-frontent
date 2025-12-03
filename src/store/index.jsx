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
import { apiRoomsOcasional } from '../reducers/apiRoomsOcasionalReducers'
import { DianSlice } from '../reducers/DianReducer'
import { PmstraSlice } from '../reducers/pmstraReduccers'
import { OccupationSlice } from '../reducers/OccupationPorcentajeReducers'
import { UserUpdateRolesSlice } from '../reducers/UserUpdateRolesReducers'
import { InformeDashboardSlice } from '../reducers/InformeDashboardReducers'
import { ApiCloudbedsReducersSlice } from '../reducers/ApiCloudbedsReducers'
import { apiInformeAuditoriaSlice } from '../reducers/ApiInformeAuditoriaReducers'
import { CitySigoSlice } from '../reducers/CitySigoReducers'
import { ApiwompiReducersSlice } from '../reducers/ApiwompiReducers'


  
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
        SearchUsers:searchSlice.reducer,
        Ocasioanal:apiRoomsOcasional.reducer,
        Dian:DianSlice.reducer,
        Trapms:PmstraSlice.reducer,
        OccupationPorcentajeSlice:OccupationSlice.reducer,
        UserUpdateRolesSlice:UserUpdateRolesSlice.reducer,
        InformeDashboardSlice:InformeDashboardSlice.reducer,
        InformeDashboardSlice:InformeDashboardSlice.reducer,
        apiInformeAuditoriaSlice:apiInformeAuditoriaSlice.reducer,
        ApiCloudbedsReducersSlice:ApiCloudbedsReducersSlice.reducer,
        CitySigoSlice:CitySigoSlice.reducer,
        ApiwompiReducersSlice:ApiwompiReducersSlice.reducer
    },
    devTools:true
})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store
