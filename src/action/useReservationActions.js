import { useContext } from "react"
import HttpClient from "../HttpClient"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import  {ReservationSlice}  from "../reducers/ReservationReducers"
import  AutoProvider  from "../privateRoute/AutoProvider"
import moment from "moment"
import { ServiceReservas } from "../page-resesion/Dashboard/dummy_data"
import ServicetypeRooms from "../service/ServicetypeRooms"

const useReservationActions  =() =>{

    const {jwt} = useContext(AutoProvider)
    const dispatch = useAppDispatch()
    const { loading,Items,error} = useAppSelector((state) => state.ReservationSlice)


    const getPostByReservation =  async({type}) =>{
        console.log(type)
        dispatch(ReservationSlice.actions.loading())
        try {
            const postResponse = await  ServiceReservas({id:jwt.result.id_hotel,type})
            dispatch(ReservationSlice.actions.setReservation(postResponse))
        } catch (error) {
                dispatch(ReservationSlice.actions.setError("no found"))
        }
    }   

    const getRoomByReservation  = async() =>{

        try {   
            const getRoom = await HttpClient.GetRoom({url:jwt.result.id_hotel}) 
            if(getRoom){
                dispatch(ReservationSlice.actions.setRoom(getRoom?.query))
            }
        } catch (error) {
            dispatch(ReservationSlice.actions.setError("no found"))
        }

    }


    const getRoomFilterRoom  = async() =>{
        try {   

            const getRoomFilter= await ServicetypeRooms({id:jwt.result.id_hotel})
            
            if(getRoomFilter){
                dispatch(ReservationSlice.actions.setReservationFilter(getRoomFilter?.query))
            }
        } catch (error) {
            dispatch(ReservationSlice.actions.setError("no found"))
        }

    }


    const setUpdateFilterReservation =(Items) =>{
        try {

            dispatch(ReservationSlice.actions.setSaveReservation(Items))
            
        } catch (error) {
            dispatch(ReservationSlice.actions.setError("no found"))
        }
    }

    const setPostInformContabilidad =async() =>{
        try {

            const postInformationReservation= await HttpClient.postInformContabilidad({id:jwt.result.id_hotel})

            if(postInformationReservation){
                dispatch(ReservationSlice.actions.setReservationContabilidad(postInformationReservation?.query))
            }else{
                dispatch(ReservationSlice.actions.setError("no found"))
            }

        } catch (error) {
            dispatch(ReservationSlice.actions.setError("no found"))
        }
    }

       
    return  {getPostByReservation,
                Items,
                getRoomByReservation,
                ReservationSlice,
                getRoomFilterRoom,
                setUpdateFilterReservation,
                setPostInformContabilidad
            
                        
    }

}

export default useReservationActions 