import React from "react";
import { CiDatabase } from "react-icons/ci";

const CardStore =({totalday}) =>{

    const payDay = totalday?.totalDay?.totalDay.toLocaleString();

    console.log(totalday)

    return (
        <div>
            <ul  className="container-card" >
                <li className="card-stores  card-One card-stores-color" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >Cop {payDay}</h4>
                        <span className="text-venta"  >Venta dia</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.RoomBusyById[0]?.Num_Reservas}</h4>
                        <span className="text-venta"  >Hab ocupadas</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.TotalHuespedById[0]?.Num_Reservas}</h4>
                        <span className="text-venta"  >Total huespedes</span>
                    </div>
                </li>

                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >{totalday?.RoomReservationbyId[0]?.Num_Reservas}</h4>
                        <span className="text-venta"  >Reservadas</span>
                    </div>
                </li>
            </ul>  
        </div>
    )

}

export default CardStore