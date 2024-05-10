
import React, { useRef }   from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useReactToPrint } from "react-to-print";

const CardInvoinces =({handChangeClose,showInforme,handSubmitInvoinces,loading,NumberRoom,Room,UsernameUser}) =>{

    let componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });

 
    const handCliSubmit =async() =>{
        handlePrint()
        handSubmitInvoinces({Id_user:showInforme.Id_user,id_huesped:showInforme.id_huesped,Fecha:showInforme.Fecha,NumberDesayuno:1,Id_hotel:showInforme.Id_hotel,ID_Reserva:showInforme.ID_Reserva})
    }

    return ( <div className="border-ri">
    <div>
        <div className="content-Modal-store"   ref={componentRef} >
            <div className="handclose" >
                    <IoMdCloseCircle   fontSize={30} color="black" onClick={handChangeClose}  />
                    </div>
                            <div  className="form-login container-invoince-to "> 
                                <h6 className="p title-invoince " >Desayuno  </h6>
                                <span className="atm title-invoince-cart" >Recepcionista: {UsernameUser}</span>
                                <span className="title-invoince-cart">Habitacion: {Room}  {NumberRoom}   </span>  
                                <span className="title-invoince-cart">Cliente:  {showInforme.Username}  {showInforme.Lastname} </span>  
                                
                        
                            <div className="container-invoince line-invoince"></div>
            
                            <h6 className="p title-invoince " >Gracias por su visita</h6>
                           
                        
                        </div>            
                </div>     
            </div>
            <button id="demo" className= {` top-button-invoince checkOut  sub-total-top`} disabled={loading} onClick={handCliSubmit}    >
                <span className="itemNameonE"  >Guardar e imprimir</span>
            </button>
            </div>
    )
}


export default CardInvoinces