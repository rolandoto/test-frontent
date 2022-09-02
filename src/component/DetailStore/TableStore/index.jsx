import React, { useState ,useEffect} from "react"


const TableStore =({id}) =>{
     
    const [state,setState] = useState()

    useEffect(() =>{
        fetch(`http://localhost:4000/api/admin/getlistproductadmin/${id}`)
        .then(resp => resp.json())
        .then(data => setState(data))
    }, [])

    return (
        <div className="container-table">
            <table className="table">
                <tr>
                    <th>Tipo de categoria</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Opciones</th>
                </tr>

                {state?.query.map(index =>{

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
        </div>
    )

}

export default TableStore