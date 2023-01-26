import UseUsers from "../hooks/UseUser"

const fromServiceBictacoras =apiresponse =>{

    
        if(Array.isArray(apiresponse)){
               const Motels  = apiresponse.map((mt) =>{
                   const {id_hotel,id_bitacora,nombre,apellido,fecha,hora,ubicacion,descripcion} = mt
                   return {id_hotel,id_bitacora,nombre,apellido,fecha,hora,ubicacion,descripcion}
               })
           return Motels
       }
}

export const ServiceBictacoras = ({id}) =>{
  
   const url = `https://grupo-hoteles.com/api/getBitacoraByIDHotel?id_hotel=${id}`
   return fetch(url)
      .then(res => res.json())
      .then(fromServiceBictacoras)
}
