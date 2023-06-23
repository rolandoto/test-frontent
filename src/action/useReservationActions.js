import { useContext } from "react"
import HttpClient from "../HttpClient"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import  {ReservationSlice}  from "../reducers/ReservationReducers"
import  AutoProvider  from "../privateRoute/AutoProvider"
import moment from "moment"

const useReservationActions  =() =>{

    const {jwt} = useContext(AutoProvider)
    const dispatch = useAppDispatch()
    const { loading,Items,error} = useAppSelector((state) => state.ReservationSlice)

  
    
    const getPostByReservation =  async() =>{
        dispatch(ReservationSlice.actions.loading())
        try {
            const postResponse = await  HttpClient.GetReservation({url:jwt.result.id_hotel})

            if(postResponse){
                const formatDateString = (dateString) => moment(dateString).utc().format('YYYY/MM/DD');
      
                const postsMapped = postResponse?.query?.map((reservationItem) => {
                const { Fecha_final, Fecha_inicio, Num_Room, Codigo_reservaOne, Nombre, Last_name, Observation, Noches, Adultos, Ninos, ID_Habitaciones, ID_Tipo_estados, ID, Title, Document, Codigo_reserva } = reservationItem;
                const daysend = new Date(Fecha_final);
                const daystart = new Date(Fecha_inicio);
            
                return {
                    Num_Room,
                    Codigo_Reserva: Codigo_reservaOne,
                    full_name: `${Nombre} ${Last_name}`,
                    Observation,
                    Fecha_inicio: formatDateString(Fecha_inicio),
                    Fecha_final: formatDateString(Fecha_final),
                    Noches,
                    Adultos,
                    Ninos,
                    end_time: daysend,
                    group: ID_Habitaciones,
                    id: ID,
                    title: Title,
                    start_time: daystart,
                    state: ID_Tipo_estados,
                    name: Nombre,
                    document: Document,
                    code: Codigo_reserva,
                    last_name: Last_name,
                };
                });
                dispatch(ReservationSlice.actions.setReservation(postsMapped))
            }else{
                dispatch(ReservationSlice.actions.setError("no found"))
            }
            
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


    

       
    return  {getPostByReservation,
                Items,
                getRoomByReservation,
                ReservationSlice
            
                        
    }

}

export default useReservationActions 