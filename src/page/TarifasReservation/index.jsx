import React, { useContext, useEffect, useState } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import { Checkbox, Spacer, User } from "@nextui-org/react";
import { config } from "../../config";
import moment from "moment";
import ItemTableTarifas from "../../component/ItemTableTarifas";
import  AutoProvider  from "../../privateRoute/AutoProvider";

const TarifasReservation = () =>{
    const  {jwt} =useContext(AutoProvider)
    const  [state,setState] =useState()
    const [loading,setLoading] =useState(false)

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/admin/getTarifasReservation/${jwt.result.id_hotel}`)
        .then(resp =>resp.json())
        .then(data => setState(data.query))
    },[loading])

    const totalListoWaiting = state?.filter(item => item.valid_buy == 0)
    const totalListosuccess = state?.filter(item => item.valid_buy == 1)
    const totalListonoAproved = state?.filter(item => item.valid_buy == 2)

    if(!state) return null

        return (
            <ContainerGlobal>
                 {totalListoWaiting.length>0 &&  <ItemTableTarifas
                                                     valid={true} 
                                                    color="error" 
                                                    state={totalListoWaiting}
                                                    setLoading={setLoading}  /> }
                {totalListosuccess.length >0 && <ItemTableTarifas 
                                                     approved={true} 
                                                     color="success" 
                                                     state={totalListosuccess}  />  } 
                {totalListonoAproved.length>0  && <ItemTableTarifas  
                                                    approved={false}  
                                                    color="secondary"
                                                    state={totalListonoAproved}  /> } 
            </ContainerGlobal>
        )

}

export default TarifasReservation