import moment from "moment"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import ServiceAuditoria from "../../service/ServiceInformeAuditoria"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import LoadingDetail from "../../Ui/LoadingDetail"


const InformeAuditoria =() =>{


    const fecha = "2023-02-15"

    const [auditoria,setAuditoria] =useState()

    const hanLookingFor =() =>{
        ServiceAuditoria({id:13,fecha}).then(index =>{
            setAuditoria(index)
        }).catch(e =>{
            console.log(e)
        })
    }
    
    
    console.log(auditoria)

    return (
        <ContainerGlobal>
             <LoadingDetail  
                        loading={true}
                        titleLoading={"Informe  auditoria"}  />

            <button onClick={hanLookingFor}>Buscar</button>

            <table className="de" >
                <tbody>
                    <tr>
                        <th>Fecha</th>
                        <th>Cuenta</th>
                        <th>Valor</th>
                        <th class="descri" >Forma pago</th>
                        </tr>
                        {auditoria?.query?.map(index =>{
                              const fecha =  moment(index.Fecha_inicio).utc().format('YYYY/MM/DD')
                            return (
                           <tr>
                            <td>{fecha}</td>
                            <td>{index.Numero}</td>
                            <td>{index.Valor_habitacion}</td>
                            <td>{index.Nombre}</td>
                       </tr>  
                       )
                        })}
                </tbody>
            </table>
        </ContainerGlobal>
    )

}

export default InformeAuditoria