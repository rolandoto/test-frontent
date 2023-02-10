import React from "react";
import { CiDatabase } from "react-icons/ci";

const CardStore =({countRoom}) =>{

    const count    = countRoom?.length

    return (
        <div>
            <ul  className="container-card" >
                <li className="card-stores  card-One card-stores-color" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >0</h4>
                        <span className="text-venta"  >Venta dia</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >0</h4>
                        <span className="text-venta"  >Hab ocupadas</span>
                    </div>
                </li>
                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >0</h4>
                        <span className="text-venta"  >Total huespedes</span>
                    </div>
                </li>

                <li className="card-stores  card-One card-store-gris" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one " >0</h4>
                        <span className="text-venta"  >Reservadas</span>
                    </div>
                </li>
            </ul>  
        </div>
    )

}

export default CardStore