const ENDPOINT =`https://grupo-hoteles.com/api/postInformeConsolidado`

    const ServiceInformesConsolidado =({id_user,id_hotel,date,habitaciones_ocupadas,habitaciones_sinVender,efectivo_total,otrosMedios_total,dolares_total,gastos_NoCajaMenor,t_debito,t_credito,transferencia,pago_agil,bitcoin,payonner,dolares,euros,puntos_aeropuerto,puntos_lavanderia,puntos_turismo,puntos_seguroHotelero,ventas_souvenirs,ventas_bebidas,ventas_snacks,ventas_jacuzzi,observaciones,img_rack})=>{
        return fetch(`${ENDPOINT}`,{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },  
            body: JSON.stringify({id_user,id_hotel,date,habitaciones_ocupadas,habitaciones_sinVender,efectivo_total,otrosMedios_total,dolares_total,gastos_NoCajaMenor,t_debito,t_credito,transferencia,pago_agil,bitcoin,payonner,dolares,euros,puntos_aeropuerto,puntos_lavanderia,puntos_turismo,puntos_seguroHotelero,ventas_souvenirs,ventas_bebidas,ventas_snacks,ventas_jacuzzi,observaciones,img_rack})
        }).then(resp =>{
            if(!resp.ok) throw new Error('Response is not ok')
            return resp.json()
        }).then(resp=>{
            return resp
        })
    }
    export default ServiceInformesConsolidado