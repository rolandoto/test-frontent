import React  from "react";
import UseRoundRention from "../../hooks/UseRoundRention";
import UseRoundRetentionSinIva from "../../hooks/UseRoundRetentionSinIva";

const CardRententionIvoinceSinIva =({Dashboard,totalStore}) =>{

    const {valor_abono,Retention} =  Dashboard
    const {SubtotalDianSinIva,TotalRetentionDianSinIva} =UseRoundRetentionSinIva({Price:valor_abono})

    const mensajeRetencion = Retention === 0  ? (
        <div >
            <div className="sub-total title-invoince-cart">
            <span>Total Hospedaje</span>
                <span className="valo" >COP {parseInt(totalStore).toLocaleString()}</span>
            </div>
            
        </div>
    ): (<div >
          <div className="sub-total title-invoince-cart sub-total-top">
                <span>Sub Total</span>
                <span className="valo" >COP {SubtotalDianSinIva} </span>
            </div>
            <div className="sub-total title-invoince-cart">
                <span>Retefuente 3.5%</span>
                <span className="valo" >COP {TotalRetentionDianSinIva}</span>
            </div>
            <div className="container-invoince line-invoince"></div>
            <div className="sub-total title-invoince-cart">
                <span>Total Hospedaje</span>
                <span className="valo" >COP {parseInt(totalStore).toLocaleString()}</span>
            </div>
        </div>)

        return (<>{mensajeRetencion}</>)
}

export default CardRententionIvoinceSinIva