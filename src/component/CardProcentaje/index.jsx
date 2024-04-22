import React from "react";
import WebVitals from "../Web-vital";
import CardDetailPorcentaje from "../CardDetailPorcentaje";


const CardPorcentaje =({Available,Block,Occupation, NumReservation,NumBlock,NumAvailable}) => {

    return ( <div className="flex-item-dashboard border-top center-porcentaje  	" style={{backgroundColor:"white" }}   >
                <div className="container-porcentaje-detail" >
                    <WebVitals  value={Occupation} />
                </div>

                <div>
                    <CardDetailPorcentaje 
                        className="circle-dashboard"
                        title="Reservadas"
                        NumberPorcentaje={NumReservation}
                        porcentaje={Occupation}  />
                    <CardDetailPorcentaje 
                        className="circle-dashboard-avaible"
                        title="Disponible"
                        NumberPorcentaje={NumAvailable}
                        porcentaje={Available}  />

                    <CardDetailPorcentaje 
                        className="circle-dashboard-block"
                        title="Bloquedas"
                        NumberPorcentaje={NumBlock}
                        porcentaje={Block}  />
                </div>
               
               
               
            </div>)

}

export default CardPorcentaje