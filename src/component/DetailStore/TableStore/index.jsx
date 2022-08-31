import React, { useState } from "react"
import { useEffect } from "react"

const TableStore =({id}) =>{
     
    const [state,setState] = useState()

    useEffect(() =>{
        fetch(`http://localhost:4000/api/admin/getroomsadmin/${id}`)
        .then(resp => resp.json())
        .then(data => setState(data))
    }, [])

    return (
        <div className="container-table" >
            <table className="table" >
                <tr>
                    <th>Tipo de categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                    {state?.ray.map(index =>{

                        return (
                            <tr>
                                <td>{index.nombre}</td>
                                <td>{index.nombreEstado}</td>
                                <td>{index.Numero}</td>
                                <td>{index.precio}</td>
                                <td>{index.precio_persona}</td>
                            </tr>
                        )
                    })}
            </table>
        </div>
    )

}
export default TableStore