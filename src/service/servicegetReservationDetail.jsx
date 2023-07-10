import moment from "moment"
import { config } from "../config"

const servicegetReservationDetail =(event) =>{

    const  to = event.query.map((index,e ,ary)=> {
        let daystart = new Date(index.Fecha_inicio)
        let daysend = new Date(index.Fecha_final)
        const group = index.ID_Habitaciones
        const title = `${index.Title}`
        const id  = index.ID
        const state  = index.ID_Tipo_estados
        const name = index.Nombre
        const last_name = index.Last_name
        const document = index.Document
        const code = index.Codigo_reserva
  
          return {
            Num_Room:index.Num_Room,
            Codigo_Reserva:index.Codigo_reservaOne,
            full_name:`${index.Nombre} ${index.Last_name}`,
            Observation:index.Observation,
            Fecha_inicio: moment(index.Fecha_inicio).utc().format('YYYY/MM/DD'),
            Fecha_final:moment(index.Fecha_final).utc().format('YYYY/MM/DD'),
            Noches:index.Noches,
            Adultos:index.Adultos,
            Ninos:index.Ninos,
            end_time: daysend,
            group,  
            id,
            title,
            start_time: daystart,
            state:state,
            valor_habitacion:index.Valor_habitacion,
            abono:index.abono,
            name,
            document,
            code,
            last_name:last_name,
            Celular:index.Celular,
            codigo:index.codigo,
            nacionalidad:index.nacionalidad,
            habitacion:index.habitacion,
            ID_document:index.ID_document,
            ID_hotel:index.ID_hotel,
            ID_tipo_habitaciones:index.ID_tipo_habitaciones
          }
        })
      return to

}


export const ServiceReservaDetail =() =>{
    return fetch(`${config.serverRoute}/api/resecion/getReservationSearch`)
    .then(resp  => resp.json())
    .then(data=> servicegetReservationDetail(data))
  }