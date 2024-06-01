import React  from "react";
import UseRoundRention from "../../hooks/UseRoundRention";

const CardRetention =({Dashboard,Total,ValorTotal,Iva,totalStore}) =>{

    const {valor_abono,Retention} =  Dashboard
    const {SubtotalDian,TotalRetentionDian,TotalPay,TotalIva} =UseRoundRention({Price:valor_abono})

    const mensajeRetencion = Retention === 0  ? (
        <div >
           <div className="sub-total title-invoince-cart sub-total-top">
                <span>Sub Total</span>
                <span className="valo" >COP {Total} </span>
            </div>
            <div className="sub-total title-invoince-cart" >
                <span>IVA 19%:</span>
                <span className="valo" >COP {Iva}</span>
            </div>
            <div className="sub-total title-invoince-cart">
                <span>Total</span>
                <span className="valo" >COP {ValorTotal}</span>
            </div>
            <div className="container-invoince line-invoince"></div>
            <div className="sub-total title-invoince-cart">
                <span>Total Hospedaje</span>
                <span className="valo" >COP {parseInt(totalStore).toLocaleString()}</span>
            </div>
            
        </div>
    ): (<div >
            <div className="sub-total title-invoince-cart">
                <span>Sub total:</span>
                <span className="valo" >COP {parseInt(SubtotalDian).toLocaleString()}</span>
            </div>
            <div className="sub-total title-invoince-cart">
                <span>IVA 19%:</span>
                <span className="valo" >COP {parseInt(TotalIva).toLocaleString()}</span>
            </div>
            <div className="sub-total title-invoince-cart">
                <span>Retefuente 3.5%:</span>
                <span className="valo" >COP {parseInt(TotalRetentionDian).toLocaleString()}</span>
            </div>
            <div className="sub-total title-invoince-cart">
                <span>Valor total:</span>
                <span className="valo" >COP {parseInt(TotalPay).toLocaleString()}</span>
            </div>
            <div className="container-invoince line-invoince"></div>
            <div className="sub-total title-invoince-cart">
            <span>Total Hospedaje</span>
                <span className="valo" >COP {parseInt(totalStore).toLocaleString()}</span>
            </div>
           
        </div>)

        return (<>{mensajeRetencion}</>)
}

export default CardRetention