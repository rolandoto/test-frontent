import React from "react"
import { Progress, Grid } from "@nextui-org/react";
import { HeartIcon } from "../../page-resesion/Dashboard/IconReservation";

const Footer =({totalday}) =>{

    const totalWidth = totalday?.RoomReservationbyId[0]?.Num_Reservas

    const HabitacionOcupadas  =  totalday?.RoomBusyById[0]?.Num_Reservas

    const huesped = totalday?.TotalHuespedById[0]?.Num_Reservas

    const tienda = (totalday?.totalDay?.totalDay.toLocaleString())

//#0072f5
    return (
        <>
         <footer className='footer-one'  style={{width:`${10}%`}} >
         <ul className="flex-footer icon-state-reservation">
                        <span className="text-words" >Total huespedes</span>
                        <span className="text-words" >{huesped}</span>
                     

                    </ul>
            </footer>
            <footer className='footer' style={{width:`${10}%`}}   >
            <ul className="flex-footer icon-state-reservation"  >
                        <span className="text-words" >Total venta</span>
                        <span className="text-words" >${tienda}</span>
                       

                    </ul>
            </footer>
           
            <footer className='footer-two'  style={{width:`${10}%`}}   >
            <ul className="flex-footer icon-state-reservation">
                        <span className="text-words" >Habitaciones ocupada</span>
                        <span className="text-words" >{HabitacionOcupadas}</span>
                
                    </ul>
            </footer>

             <footer className='footer-four' style={{width:`${10}%`}} >
                    <ul className="flex-footer icon-state-reservation">
                        <span className="text-words" >  Total reservas</span>
                        <span className="text-words" >{totalWidth} </span>
                     
                    </ul>
               
            </footer>
        </>
     )

}

export default Footer