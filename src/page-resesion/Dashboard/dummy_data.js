import moment from "moment";
import { config } from "../../config";

const fromReservas = (event) => {
  return event.query.map((index) => {
    const {
      Fecha_inicio,
      Fecha_final,
      ID_Habitaciones: group,
      Title: title,
      ID: id,
      ID_Tipo_estados: state,
      Nombre: name,
      Last_name: last_name,
      Document: document,
      Codigo_reserva: code,
      ID_Canal: canal,
      Num_Room,
      Codigo_reservaOne,
      Observation,
      Noches,
      Adultos,
      Ninos,
      Valor_habitacion: valor_habitacion,
      abono,
      Celular,
      codigo,
      nacionalidad,
      valor_dia_habitacion: pagos_dia,
      ID_facturacion,
    } = index;

    const dayStart = new Date(Fecha_inicio);
    const dayEnd = new Date(Fecha_final);

    return {
      Num_Room,
      Codigo_Reserva: Codigo_reservaOne,
      full_name: `${name} ${last_name}`,
      Observation,
      Fecha_inicio: moment(Fecha_inicio).utc().format('YYYY/MM/DD'),
      Fecha_final: moment(Fecha_final).utc().format('YYYY/MM/DD'),
      Noches,
      Adultos,
      Ninos,
      end_time: dayEnd,
      group,
      id,
      title,
      start_time: dayStart,
      state,
      valor_habitacion,
      abono,
      name,
      document,
      code,
      last_name,
      Celular,
      codigo,
      nacionalidad,
      pagos_dia,
      ID_facturacion,
      canal,
    };
  });
};

export const ServiceReservas = async ({ id, type }) => {
  try {
    const response = await fetch(`${config.serverRoute}/api/resecion/getreservarecepcion/${id}`, {
      method: "POST",
      body: JSON.stringify({ id, type }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Response is not ok");

    const data = await response.json();
    return fromReservas(data);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};