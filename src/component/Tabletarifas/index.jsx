import { Button, Checkbox,Text, User } from "@nextui-org/react"
import moment from "moment"
import React, { useState } from  "react"
import HttpClient from "../../HttpClient"
import { toast } from "react-hot-toast"

const TableTarifas = (props) =>{

    const {ID, 
            Fecha,
            foto,
            name,
            Description,
            valor,
            codigo_reserva,
            name_reservation,
            color,
            valid,
            noches,
            Abono,
            approved,
            ID_reservation,
            setLoading} = props

    const fecha =moment(Fecha).utc().format('YYYY/MM/DD')

    const [checkBox,setCheckBox] =useState(false)
    const [checkBoxOne,setCheckBoxOne] =useState(false)

    const totalbyID = checkBox && 1 || checkBoxOne && 2 

    const handSubmitClick =() =>{
        HttpClient.postUpdateTarifaReservation({id:ID,valid_buy:totalbyID,noches,Abono,ID_reservation,valor}).then(index =>{
            console.log(index)
            setCheckBoxOne(false)
            setCheckBox(false)
            setLoading(even => !even)
            toast.success("Se envio solicitud")
        }).catch(e =>{
            console.log("error")
            toast.error("Error al guardar datos")
        })
    }

    const handChangeCheckBox = () =>{
        setCheckBox(!checkBox)
        setCheckBoxOne(false)
    }

    const handChangeCheckBoxOne =() =>{
        setCheckBoxOne(!checkBoxOne)
        setCheckBox(false)
    }
                      
    return (
            <tr  >
                <td>
                        <User
                        bordered
                        squared
                        src={foto}
                        name={name}
                        color={color}
                        zoomed
                        /></td>
                        <td>{Description}</td>
                        <td>${valor.toLocaleString()}</td>
                        <td>{fecha}</td>
                        <td>{codigo_reserva}</td>
                        <td>{name_reservation}</td>
                        {valid &&  (<>  <td>   
                        <Checkbox color="success"    labelColor="success" defaultSelected onChange={handChangeCheckBox} checked={checkBox} > <Text  size="$xs" color={"success"}>Aprobar</Text> </Checkbox> 
                    
                        <Checkbox color="error"  labelColor="error" defaultSelected onChange={handChangeCheckBoxOne} checked={checkBoxOne} ><Text  size="$xs" color={"error"}> No aprobar </Text> </Checkbox>
                    </td>
                    <td>
                    <Button color="primary" auto onClick={handSubmitClick} >
                        Confirmar
                    </Button>
                    </td>
                    </>
                    )
                }
                {!valid ?  approved ? <td>  <Text size="$xs" color={color}>
                Aprobado
                </Text> </td> : <td>   <Text size="$xs" color={color}>
                    No aprobado
                </Text>  </td> : null }
        </tr>
        )
    
}

export default TableTarifas