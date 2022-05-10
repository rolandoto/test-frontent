const fromServiceReservas =apiresponse =>{

    const {link} = apiresponse.reservas.data.result 
        return link
}

export const ServiceReservas = ({id}) =>{

   const url = `http://localhost:4000/api/reservas/${id}`
   return fetch(url)
      .then(res => res.json())
      .then(fromServiceReservas)
}
