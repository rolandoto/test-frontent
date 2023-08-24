import React, { useState ,useEffect} from "react"
import { useHistory } from "react-router-dom"
    import { CiSquarePlus } from "react-icons/ci";

const TableStore =({Store}) =>{

    const history = useHistory()

    return (
        <div className="container-bicta ">
            <tbody className="" >
            <table className="de  ">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }
 
                    if(index.id_categoria== 1)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color"  >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus     fontSize={35}  /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }
                    if(index.id_categoria== 2)
                    return (
                        <tr>
                            <td className="table-color-color"  >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus     fontSize={35}  /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{
                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }
                    
                    if(index.id_categoria== 3)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus    fontSize={35}  /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>
            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{
                    
                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }
                    
                    if(index.id_categoria== 4)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus    fontSize={35}  /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }

                    if(index.id_categoria== 5)
                    return (
                        <tr>
                            <td className="table-color-color"  >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus     fontSize={35}  /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                    const handHistory = () =>{
                        history.push(`/detailById/${index.ID}`)
                    }

                    if(index.id_categoria== 6)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" > {index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus  fontSize={35} /> </button></td>
                        </tr>
                    )
                })}
            </table>
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                const handHistory = () =>{
                    history.push(`/detailById/${index.ID}`)
                }

                    if(index.id_categoria== 7)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus    fontSize={35} /> </button></td>
                        </tr>
                    )
                })}
            </table>

            
            
            </tbody>

            <tbody>
            <table className="de">
                <tr>
                    <th>Categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {Store?.query?.map(index =>{

                const handHistory = () =>{
                    history.push(`/detailById/${index.ID}`)
                }

                    if(index.id_categoria== 8)
                    return (
                        <tr>
                            <td className="table-color-color" >{index.Nombre_categoria}</td>
                            <td className="table-color-color" >{index.Nombre}</td>
                            <td className="table-color-color" >{index.Cantidad}</td>
                            <td className="table-color-color" >{index.Precio}</td>
                            <td className="table-color-color" ><button  className="button-Border-Id"   onClick={handHistory} > <CiSquarePlus    fontSize={35} /> </button></td>
                        </tr>
                    )
                })}
            </table>

            
            
            </tbody>
        </div>
    )

}

export default TableStore