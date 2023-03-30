import moment from "moment";
import { date } from "yup";
import { config } from "../../config";

const fromRervas =(event)  =>{
  
      const  to = event.query.map((index,e )=> {
      let daystart = new Date(index.Fecha_inicio)
   
      const start_time = daystart.toISOString().split('T')[0]
      
      let daysend = new Date(index.Fecha_final)
      const end_time = daysend.toISOString().split('T')[0]

      const group = index.ID_Habitaciones
      
      const title = `<h1>${index.Title}</h1>`

      const id  = index.ID

      const state  = index.ID_Tipo_estados

      const name = index.Nombre
      
      const last_name = index.Last_name

      const document = index.Document

      const code = index.Codigo_reserva

      console.log({"index":index})

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
          name,
          document,
          code,
          last_name:last_name
        }
      })
    return to
}

export const ServiceReservas =({id}) =>{

  return fetch(`${config.serverRoute}/api/resecion/getreservarecepcion/${id}`)
  .then(resp  => resp.json())
  .then(data=> fromRervas(data))
}