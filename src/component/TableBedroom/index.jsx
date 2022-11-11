import React, { useState } from "react"
import { useEffect } from "react"

const TableBedRoom =({Room}) =>{
   
    return (
        <div className="container-table" >
            <table className="table" >
                <tr>
                    <th>Tipo de habitacion</th>
                    <th>tipo de estado</th>
                    <th>Numero o Nombre</th>
                    <th>Precio</th>
                    <th>Precio persona adicional</th>
                    <th>Cantidad de personas</th>
                    <th>Cantidad maximos de personas</th>
                </tr>

                    {Room?.ray?.map(index =>{

                        return (
                            <tr>
                                <td>{index.nombre}</td>
                                <td>{index.nombreEstado}</td>
                                <td>{index.Numero}</td>
                                <td>{index.precio}</td>
                                <td>{index.precio_persona}</td>
                                <td>{index.persona}</td>
                                <td>{index.max_persona}</td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )

}
export default TableBedRoom