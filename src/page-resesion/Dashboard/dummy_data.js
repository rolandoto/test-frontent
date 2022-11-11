import moment from "moment";
import { date } from "yup";

const fromRervas =(event)  =>{
  
    const  to = event.query.map((index,e )=> {
      let daystart = new Date(index.Fecha_inicio)
      console.log(daystart);
      const start_time = daystart.toISOString().split('T')[0]
      
      let daysend = new Date(index.Fecha_final)
      const end_time = daysend.toISOString().split('T')[0]

      const group = index.ID_Habitaciones

      const title = index.Title

      const id  = index.ID



      return {
        end_time: daysend,
        group,
        id,
        title,
        start_time: daystart,
        state:3
      }
    })
    return to
}

export const ServiceReservas =() =>{

  return fetch("http://localhost:4000/api/resecion/getreservarecepcion")
  .then(resp  => resp.json())
  .then(data=> fromRervas(data))
}