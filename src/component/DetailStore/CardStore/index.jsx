import React from "react";

const CardStore =() =>{

    return (
        <div>
            <ul  className="container-card" >
                <li className="card-stores" >
                    <div>
                        <h1 className="title-card" >30.0000</h1>
                        <span>Habitacion</span>
                    </div>
                </li>

                <li className="card-stores" >
                    <h1 className="title-card" >4</h1>
                    <span>Tipos de habitaciones</span>
                </li>

                <li className="card-stores" >
                    <h1 className="title-card" >Med</h1>
                    <span>Ciudad</span>
                </li>

                <li className="card-stores" >
                    <h1 className="title-card" >26.000.00</h1>
                    <span>Proyeccion MES 80%</span>
                </li>
                <li className="card-stores" >
                    <h1 className="title-card"  >86.000.000</h1>
                    <span>Proyecion ANO 80%</span>
                </li>
                
            </ul>  
        </div>
    )

}

export default CardStore