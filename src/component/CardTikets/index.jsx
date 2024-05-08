import { Button } from "@nextui-org/react"
import moment from "moment"
import React, { useState } from "react"

const CardTikets =({Username,Lastname,id_huesped,Id_hotel,handChange,Fecha,NumberDesayuno,ID_Reserva,Id_user,setShowinforme}) =>{
//<Button disabled={loadingValiHuesped} onClick={OnclickHandSubmit}  color={"success"} size={"xs"} >Generar Factura</Button>


    const handChangeAll =() =>{
        handChange()
        setShowinforme({Username,Lastname,id_huesped,Id_hotel,Fecha,NumberDesayuno,ID_Reserva,Id_user})
    }
    

    return (<>
          
                <div className="cardWrap">
                    <div className="card cardLeft">
                        <h1 className="title-tikects" >Tickets <span>Desayuno</span></h1>
                        <div className="title">
                        </div>
                        <div className="name">
                            <span>Nombre</span>
                            <h2 className="title-name" >{Username}</h2>
                        </div>
                        <div className="name">
                            <span>Apellido</span>
                            <h2 className="title-name" >{Lastname}</h2>
                        </div>
                        
                        </div>
                        <div className="card cardRight">
                            <div className="eye"></div>
                            <div className="number">
                            <h3>156</h3>
                            <span className="title-numer">Numero</span>
                            </div>
                            <div className="barcode"><Button  onClick={handChangeAll}  color={"success"} size={"xs"} >Generar Factura</Button></div>
                        </div>
                </div>
            </>
      
        )
   
}
export default CardTikets