import moment from "moment";
import { config } from "../../config";
import randomColor from "randomcolor";


let id = 1;


let randomSeed = Math.floor(Math.random() * 1000);

export const groupIds = {
  windows: 1,
  presidents: 2,
  ntdoConsoles: 3,
  ntdoHandhelds: 4,
  sonyConsoles: 5,
  sonyHandhelds: 6,
  msftConsoles: 7,
  pkmnGames: 8,
  marioGames: 9
};



const setGroup = (el, i, ary, groupId) => new Object({
  id: id,
  group: groupId,
  canMove: false,
  end_time: i + 1 in ary ? ary[i + 1].start_time : moment(),
  itemProps: {
    style: {
      background: randomColor({ luminosity: "dark", seed: el.id })
    }
  },
  ...el
});


const fromRervas =(event)  =>{
  
      const  to = event.query.map((index,e ,ary)=> {
        setGroup(index,e ,ary, groupIds.windows)
      let daystart = new Date(index.Fecha_inicio)
   
      const start_time = daystart.toISOString().split('T')[0]
      
      let daysend = new Date(index.Fecha_final)
      const end_time = daysend.toISOString().split('T')[0]

      const group = index.ID_Habitaciones

      const title = `${index.Title}`

      const id  = index.ID

      const state  = index.ID_Tipo_estados

      const name = index.Nombre
      
      const last_name = index.Last_name

      const document = index.Document

      const code = index.Codigo_reserva

      const color = randomColor({ luminosity: "light", seed: randomSeed })

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
          last_name:last_name,
          color
        }
      })
    return to
}

export const ServiceReservas =({id}) =>{
  return fetch(`${config.serverRoute}/api/resecion/getreservarecepcion/${id}`)
  .then(resp  => resp.json())
  .then(data=> fromRervas(data))
}