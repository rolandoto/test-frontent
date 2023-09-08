import { Checkbox, Text, User } from "@nextui-org/react"
import moment from "moment"
import React from "react"
import TableTarifas from "../Tabletarifas"

const ItemTableTarifas =({state,color,valid,approved,setLoading}) =>{

    return (
             <tbody>
                <table className="de" > 
                    <tr>
                        <th>Recepcionista</th>
                        <th>Descripcion</th>
                        <th>valor solicitado</th>
                        <th>Fecha</th>
                        <th>Codigo Reserva</th>
                        <th>Nombre huesped</th>
                        <th>Optiones</th>
                    </tr>
                    {state?.map(itemReservation => {
                         return <TableTarifas {...itemReservation}
                                key={itemReservation.ID}
                                setLoading={setLoading}
                                color={color}
                                valid={valid}
                                approved={approved} />  
                       })}
                    
                </table>
            </tbody>
    )

}

export default ItemTableTarifas


