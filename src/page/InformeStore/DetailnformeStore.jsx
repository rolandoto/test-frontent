import moment from "moment"
import React ,{useEffect} from "react"
import { useState } from "react"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceByIDProduct from "../../service/ServiceBYIdproduct"

const  DetailnformeStore =() =>{

    const {jwt} = useContext(AutoProvider)
    const {id} = useParams()
    const [productById,setproductByIdproduct] =useState()

    useEffect(() =>{
        ServiceByIDProduct({ID_producto:id,id:jwt.result.id_hotel})
        .then(index =>{
            setproductByIdproduct(index)
        }).catch(e =>{

        })
    },[id])

    return  (
        <div className="container-bicta">
            <tbody   > 
                <table className="de">
                    <tr>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Producto</th>
                        <th>Valor</th>
                    </tr>


                    {productById?.query?.map(index =>{
                                 
                                    const fecha = moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                                    const Precio =  index.Precio.toLocaleString();
                                    return (
                                        <tr key={index.ID} >
                                            <td>{fecha}</td>
                                            <td>{index.Cantidad}</td>
                                            <td>{index.Nombre}</td>
                                            <td>{Precio}</td>
                                        </tr>
                            )
                        })}

                    {productById?.queryOne?.map(index =>{
                        const fecha = moment(index.Fecha_compra).utc().format('YYYY/MM/DD')
                        const Precio =  index.Precio.toLocaleString();
                        return (
                            <tr key={index.ID} >
                                <td>{fecha}</td>
                                <td>{index.Cantidad}</td>
                                <td>{index.Nombre}</td>
                                <td>{Precio}</td>
                            </tr>
                        )
                    })}
                    
                </table>
        </tbody>
    </div>
    )

}

export default DetailnformeStore