import React, { useState ,useEffect} from "react"


const TableStore =({Store}) =>{

    console.log(Store)
     
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
                    if(index.id_categoria== 1)
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
                    if(index.id_categoria== 2)
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
                    if(index.id_categoria== 3)
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
                    if(index.id_categoria== 4)
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
                    if(index.id_categoria== 5)
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
                    if(index.id_categoria== 6)
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
                    if(index.id_categoria== 7)
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