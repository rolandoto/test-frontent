import React, { useState ,useEffect} from "react"


const TableStore =({Store}) =>{

     
    return (
        <div className="container-bicta">
            <tbody>
            <table className="de">
                <tr>
                    <th>Tipo de categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                    return (
                        <tr>
                            <td>{index.Nombre_categoria}</td>
                            <td>{index.Nombre}</td>
                            <td>{index.Cantidad}</td>
                            <td>{index.Precio}</td>
                            <td></td>
                        </tr>
                    )
                })}
            </table>
            </tbody>
        </div>
    )

}

export default TableStore