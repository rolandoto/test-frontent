import React, { useContext, useEffect, useState } from "react"
import  AutoProvider from "../privateRoute/AutoProvider"
import { ServiceReservas } from "../service/ReservasService"
import { ServiceReservaDetail } from "../service/servicegetReservationDetail"


const UseReservation =() =>{
    const [reservas,setReservas] =useState()

    useEffect(() =>{
        ServiceReservaDetail().then(index=>{
            setReservas(index)
        })
    },[setReservas])    

    return [reservas]

}

export default UseReservation 