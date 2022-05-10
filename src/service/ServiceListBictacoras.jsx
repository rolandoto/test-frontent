import UseUsers from "../hooks/UseUser"

const fromServiceBictacoras =apiresponse =>{

    const {link} = apiresponse.LisMotel.data.result 
        if(Array.isArray(link)){
               const Motels  = link.map((mt) =>{
                   const {id,name,time,lugar,description,date} = mt
                   return {id,name,time,lugar,description,date}
               })
           return Motels
       }
}

export const ServiceBictacoras = ({id}) =>{
  
   const url = `http://localhost:4000/api/listbitacoras/7`
   return fetch(url)
      .then(res => res.json())
      .then(fromServiceBictacoras)
}
