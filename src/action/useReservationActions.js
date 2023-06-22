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

    const getPost = async() =>{
        const {postsMapped} = mapListOfReservationCardProps({reservation:Items.query})
        dispatch(ReservationSlice.actions.setReservationFilter(postsMapped))
    }
    
    const getPostByReservation =  async() =>{
        dispatch(ReservationSlice.actions.loading())
        try {

            const postResponse = await  HttpClient.GetReservation({url:jwt.result.id_hotel})

            if(postResponse){
                dispatch(ReservationSlice.actions.setReservation(postResponse))
            }else{
                dispatch(ReservationSlice.actions.setError("no found"))
            }
            
        } catch (error) {
                dispatch(ReservationSlice.actions.setError("no found"))
        }

    }


    const mapListOfReservationCardProps =({reservation}) =>{
        let postsMapped = []
        for(let autor  of reservation){
            let daysend = new Date(autor.Fecha_final)
            let daystart = new Date(autor.Fecha_inicio)
            postsMapped.push({
                Num_Room :autor.Num_Room,
                Codigo_Reserva:autor.Codigo_reservaOne,
                full_name:`${autor.Nombre} ${autor.Last_name}`,
                Observation:autor.Observation,
                Fecha_inicio: moment(autor.Fecha_inicio).utc().format('YYYY/MM/DD'),
                Fecha_final:moment(autor.Fecha_final).utc().format('YYYY/MM/DD'),
                Noches:autor.Noches,
                Adultos:autor.Adultos,
                Ninos:autor.Ninos,
                end_time: daysend,
                group:autor.ID_Habitaciones,  
                id:autor.ID,
                title:`${autor.Title}`,
                start_time: daystart,
                state: autor.ID_Tipo_estados,
                name: autor.Nombre,
                document:autor.Document,
                code:autor.Codigo_reserva,
                last_name:autor.Last_name,
            })
           
        }

        return {postsMapped}

    }
       
    return  {getPostByReservation,
                getPost,
                Items
            
                        
    }

}

export default useReservationActions 