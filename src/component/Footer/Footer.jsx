import React, { useContext, useEffect, useState } from "react"
import { Progress, Grid } from "@nextui-org/react";
import { HeartIcon } from "../../page-resesion/Dashboard/IconReservation";
import { HiOutlineUsers } from "react-icons/hi";
import AutoProvider from "../../privateRoute/AutoProvider";
import moment from "moment";
import ServiceAllTotalReservation from "../../service/ServiceAllTotalReservation";

const Footer =({ocupied,reservas,dollar,hotel}) =>{
    const now = moment().format("YYYY-MM-DD");
    const  [totalday ,setTotalDay] =useState()
    const  {jwt} = useContext(AutoProvider)

    useEffect (() =>{
		ServiceAllTotalReservation({fecha:now,id:jwt.result.id_hotel}).then(index =>{
			setTotalDay(index)
		}).catch(e =>{
			console.log(e)
		})
	},[hotel])

    const totalWidth = totalday?.RoomReservationbyId[0]?.Num_Reservas

    const HabitacionOcupadas  =  totalday?.RoomBusyById[0]?.Num_Reservas

    const huesped = totalday?.TotalHuespedById[0]?.Num_Reservas

    const tienda = (totalday?.totalDay?.totalDay.toLocaleString())

    

    return (
        <>
         <footer className='footer-one'  style={{width:`${200}px`}} >
         <ul className="flex-footer icon-state-reservation">
                         <span className="text-words" ><HiOutlineUsers fontSize={20} /></span>
                        <span className="text-words" >Total huespedes</span>
                        <span className="text-words"style={{fontSize:"14px"}}  >{huesped}</span>
                    </ul>
            </footer>
            <footer className='footer' style={{width:`${200}px`}}   >
            <ul className="flex-footer icon-state-reservation"  >
                         <span className="text-words" >{dollar}</span>
                        <span className="text-words" >Total venta</span>
                        <span className="text-words" style={{fontSize:"14px"}}  >${tienda}</span>
                       

                    </ul>
            </footer>
           
            <footer className='footer-two'  style={{width:`${200}px`}}   >
            <ul className="flex-footer icon-state-reservation">
                        <span className="text-words" >{ocupied}</span>
                        <span className="text-words" >Hab ocupadas</span>
                        <span className="text-words" style={{fontSize:"14px"}}  >{HabitacionOcupadas}</span>
                
                    </ul>
            </footer>

             <footer className='footer-four' style={{width:`${200}px`}} >
                    <ul className="flex-footer icon-state-reservation">
                         <span className="text-words" >{reservas}</span>
                        <span className="text-words" >  Total reservas</span>
                        <span className="text-words" style={{fontSize:"14px"}}  >{totalWidth} </span>
                    </ul>
               
            </footer>
        </>
     )

}

export default Footer