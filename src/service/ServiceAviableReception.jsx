const ENDPOINT ='http://localhost:4000/api/resecion/validateavaible'

    const ServiceAvaiblereservation =({desde,hasta,habitaciones,disponibilidad,id_estados_habitaciones,ID_Canal,Adultos,Ninos,ID_Talla_mascota,Infantes,Noches,Nombre,huespe,Observacion,valor,ID_Tipo_Forma_pago,abono,valor_habitacion,Tipo_persona})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({desde,hasta,habitaciones,disponibilidad,id_estados_habitaciones,ID_Canal,Adultos,Ninos,ID_Talla_mascota,Infantes,Noches,Nombre,huespe,Observacion,valor,ID_Tipo_Forma_pago,abono,valor_habitacion,Tipo_persona})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceAvaiblereservation