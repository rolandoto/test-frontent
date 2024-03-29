import moment from "moment";
import { config } from "../../config";

const fromRervas =(event)  =>{
  
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
          pagos_dia:index.valor_dia_habitacion,
          ID_facturacion:index.ID_facturacion
        }
      })
    return to
}

export const ServiceReservas = ({id,type}) => {
  return fetch(`${config.serverRoute}/api/resecion/getreservarecepcion/${id}`,{
    method: "POST",
    body: JSON.stringify({ id,type }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((resp) => {
      if (!resp.ok) throw new Error("Response is not ok");
      return resp.json();
    })
    .then((resp) => {
      return fromRervas(resp);
    });
};
