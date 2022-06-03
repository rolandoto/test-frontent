import React, { useState } from "react"
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import Day from "../../Day";
import moment  from "moment"

const Post =({data,loading}) =>{

    const t= moment().format();   
    let today = new Date(t)
    const day = today.toISOString().split('T')[0]
    


    const Ro =(even) =>{
        const to = (new Intl.NumberFormat('de-DE').format(even))
        
        return  <span>{to}</span>
    }

   
    if(!data) return null
   
    return(
            <div>
               <div>
                </div>
                <table  className="pots" >
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre Habitacion</th>
                            <th>Fecha Entrada</th>
                            <th>Fecha Salida</th>
                            <th>Noches</th>
                            <th>Adultos</th>
                            <th>Niño</th>
                            <th>Precio</th>
                            <th>Nobre Completo</th>
                            <th>Celular</th>
                        </tr>
                    </thead>
                        {data?.map((index,e) =>{
                              let today = new Date(index.startDate)
                              let todayone =  new Date(index.endDate)
                              const result = today.toISOString().split('T')[0]
                              const resultone = todayone.toISOString().split('T')[0]

                              if(!result) return null

                              return  (
                                <tr key={e}>
                                    <td>X14A-{index.id_booking} {index.pagado ==1 && <span>pagado</span>} </td>   
                                    <td>{index.name}</td>
                                    <td>{result}</td>
                                    <td>{resultone}</td>
                                    <td>{index.nigths}</td>
                                    <td>{index.adults}</td>
                                    <td>{index.children}</td>
                                    <td>{Ro(index.price)}</td>
                                    <td>{`${index.name_person} ${index.lastName}`}</td>
                                    <td>{index.phone_person}</td>
                                </tr>
                             )}
                        )}
                </table>
            </div>
    )
}
export default Post