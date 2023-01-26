import { config } from "../config"

const fromServiceReservas =apiresponse =>{

    const {link} = apiresponse.reservas.data.result 
        return link
}

export const ServiceReservas = ({id}) =>{

   const url = `${config.serverRoute}/api/reservas/${id}`
   
   return fetch(url)
      .then(res => res.json())
      .then(fromServiceReservas)
}
