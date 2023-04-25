import react, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { config } from "../../../config"
import { CiSquarePlus } from "react-icons/ci";
import postInserStorePorduct from "../../../service/postInserStorePorduct";
import AutoProvider from "../../../privateRoute/AutoProvider";
import Swal from 'sweetalert2'
const DetailStoreById  =() =>{

    const {id}  = useParams()
    const [state,setState] =useState()
    const [cantidad,setCantidad] =useState(0)
    const {jwt} = useContext(AutoProvider)

    const handEffect =() => {
        fetch(`${config.serverRoute}/api/admin/GetListProductAdminById/${id}`)
        .then(resp => resp.json())
        .then(data => setState(data.query))
    }

    useEffect(() =>{
        handEffect()
    },[])
  
   const handCLickServiceInsertStore =() =>{
        postInserStorePorduct({ID:id,Cantidad:cantidad,Nombre_Recepcion:jwt.result.name}).then(index => {
            handEffect()
            setCantidad(0)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '<p>Exitoso</p>',
                showConfirmButton: false,
                timer: 2000
              })
        }).catch(e =>{
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: '<p>error al agregar</p>',
                showConfirmButton: false,
                timer: 2000
              })
        })
   }

   
    return (
        <div className="container-bicta">
            <tbody>
                <table className="de">
                    <tr>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Nombre Recepcion</th>
                    </tr>
                    {state?.map(index =>{
                        return (
                            <tr>
                                <td>{index.Nombre_categoria}</td>
                                <td>{index.Nombre}</td>
                                <td>{index.Cantidad_total}</td>
                                <td>{index.Precio}</td>
                                <td>{index.Nombre_Recepcion}</td>
                            </tr>)})}
                </table>
            </tbody>

            <tbody>
                <table className="de">
                    <tr>
                        <th>Cantidad</th>
                        <th>Opciones</th>
                    </tr>
                    
                            <tr>
                                <td>  
                                <input  type="number" 
                                          className="desde-detail-two" 
                                          name="Correo" 
                                          min="0"    
                                          value={cantidad}  
                                          onChange={(e) => setCantidad(e.target.value)}
                                          placeholder="Cantidad"  
                                        />
                                </td>
                                <td><button  className="button-Border-Id"   onClick={handCLickServiceInsertStore} > <CiSquarePlus     fontSize={35} /> </button></td>
                            </tr>
                </table>
            </tbody>
        </div>
    )
}
export default DetailStoreById