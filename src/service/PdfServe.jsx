import { config } from "../config"

    const ENDPOINT = `https://grupo-hoteles.com/api/descargar-pdf`

    const ServePdf =({codigoReserva,Nombre,room,adults,children,tituloReserva,abono,formaPago,habitacion,telefono,identificacion,correo,entrada,salida,tarifa,urllogo})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({codigoReserva,Nombre,room,adults,children,tituloReserva,abono,formaPago,habitacion,telefono,identificacion,correo,entrada,salida,tarifa,urllogo})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServePdf