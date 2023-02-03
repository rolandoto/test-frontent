import React from "react";
import { CiDatabase } from "react-icons/ci";

const CardStore =({countRoom}) =>{

    const count    = countRoom?.length

    return (
        <div>
            <ul  className="container-card" >
                <li className="card-stores  card-One" >
                    <CiDatabase color="white"  fontSize={50} className="content-icon-card" />
                    <div className="center-title"  >
                        <h4 className="title-card-one" >$.324,100  </h4>
                        <span className="text-venta"  >Venta dia</span>
                    </div>
                </li>
                <li className="card-stores" >
                    <div className="center-flex" >

                            <div className="center-title two-title"  > 
                                <span className="text-venta"  >Ocupacion:</span>
                                <span className="text-venta  two-title-one"   > 0 Huespedes </span>
                            </div>


                            <div className="" >
                                <div className="content-habitaciones-one">
                                    <h4 className="title-card-one po ">0</h4>
                                </div>

                                <div className="center-title"> 
                                    <span className="text-venta-two">Habitaciones ocupadas</span>
                                </div>
                            </div>

                    </div>
                  
                   
                </li>

                <li className="card-stores" >
                    <div className="center-flex" >

                            <div className="center-title two-title"  > 
                                <span className="text-venta"  >Ocupacion:</span>
                                <span className="text-venta  two-title-one"> 0 Huespedes </span>
                            </div>


                            <div className="" >
                                <div className="content-habitaciones-one">
                                    <h4 className="title-card-one po ">0</h4>
                                </div>

                                <div className="center-title"> 
                                    <span className="text-venta-two">Habitaciones Bloqueadas</span>
                                </div>
                            </div>

                    </div>
                  
                   
                </li>

                <li className="card-stores" >
                    <div className="center-flex" >

                            <div className="center-title two-title"  > 
                                <span className="text-venta"  >Ocupacion:</span>
                                <span className="text-venta  two-title-one"   > 0 Huespedes </span>
                            </div>


                            <div className="" >
                                <div className="content-habitaciones-one">
                                    <h4 className="title-card-one po ">0</h4>
                                </div>

                                <div className="center-title"> 
                                    <span className="text-venta-two">Habitaciones Asear</span>
                                </div>
                            </div>
                    </div> 
                </li>
            </ul>  
        </div>
    )

}

export default CardStore