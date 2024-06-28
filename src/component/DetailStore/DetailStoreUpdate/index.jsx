import React, { useContext, useEffect, useState } from "react"
import  AutoProvider  from "../../../privateRoute/AutoProvider"
import { useHistory } from "react-router-dom"
import { CiSquarePlus } from "react-icons/ci";
import { GiPencil } from "react-icons/gi";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { config } from "../../../config";
import PostUpdateStoreProduct from "../../../service/PostUpdateStoreProduct";
import Swal from "sweetalert2";
import { IoAlertCircle } from "react-icons/io5";
import moment from "moment";


const DetailStoreUpdate =() =>{

    const {id}  = useParams()
    const [state,setState] =useState()
    const [produ,setPordu] =useState()
    const {jwt} = useContext(AutoProvider)

    
    const handEffect =() => {
        fetch(`${config.serverRoute}/api/admin/getproduct/${id}`)
        .then(resp => resp.json())
        .then(data => setState(data.query))

        fetch(`${config.serverRoute}/api/admin/getProdcutUpdte/${id}`)
        .then(resp => resp.json())
        .then(data => setPordu(data.query))
    }
    
    const Product = state?.find(index => index.ID == id);

    const [cantidad, setCantidad] = useState();
    const [Price, setPrice] = useState();

    const PriceValue =  Price ? Price :   Product?.Precio
    const CantidadValues =  cantidad? cantidad   : Product?.Cantidad
    

    useEffect(() =>{
        handEffect()
    },[])


    const  now = moment().format("YYYY/MM/DD");

    const handCLickServiceInsertStore =() =>{
        PostUpdateStoreProduct({ID:id,Cantidad:CantidadValues,ID_user:jwt?.result?.id_user,Price:PriceValue,Fecha:now}).then(index => {
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

   if(!state) return null 
  

    return (<div>
          <div className="container-bicta">
            <tbody>
                <table className="de">
                    <tr>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Nombre Recepcion</th>
                        <th>Fecha</th>
                    </tr>
                    
                    {produ?.slice(0, -1)?.map(index =>{
                        
                        const fecharegister= moment(index.Fecha).format("YYYY/MM/DD");

                       if(index.valid ==1){
                        return (
                            <tr className="bg-red-50 border-l-4 border-red-400" >
                                <td className="bg-red-50 border-l-4 border-red-400" ><s>{index.categoria}</s></td>
                                <td className="bg-red-50 border-l-4 border-red-400" ><s>{index.Nombre}</s> </td>
                                <td className="bg-red-50 border-l-4 border-red-400" ><s>{index.Cantidad_total}</s></td>
                                <td className="bg-red-50 border-l-4 border-red-400"><s>{index.Price}</s></td>
                                <td className="bg-red-50 border-l-4 border-red-400"><s>{index.name}</s></td>
                                <td className="bg-red-50 border-l-4 border-red-400"><s>{fecharegister}</s></td>
                                <td className="bg-red-50 border-l-4 border-red-400" > <IoAlertCircle fontSize={35} color="red" /></td>
                            </tr>
                        )}else{
                            return (
                                <tr>
                                    <td><s>{index.categoria}</s></td>
                                    <td><s>{index.Nombre}</s> </td>
                                    <td><s>{index.Cantidad_total}</s></td>
                                    <td><s>{index.Price}</s></td>
                                    <td><s>{index.name}</s></td>
                                    <td><s>{fecharegister}</s></td>
                                    
                                </tr>
                            )
                        }
                })}
                    {produ?.slice(-1)?.map(index =>{
                    const fecharegister= moment(index.Fecha).format("YYYY/MM/DD");
                       if(index.valid ==1){
                        return (
                            <tr className="bg-red-50 border-l-4 border-red-400" >
                                <td className="bg-red-50 border-l-4 border-red-400" >{index.categoria}</td>
                                <td className="bg-red-50 border-l-4 border-red-400" >{index.Nombre}</td>
                                <td className="bg-red-50 border-l-4 border-red-400" >{index.Cantidad_total}</td>
                                <td className="bg-red-50 border-l-4 border-red-400">{index.Price}</td>
                                <td className="bg-red-50 border-l-4 border-red-400">{index.name}</td>
                                <td className="bg-red-50 border-l-4 border-red-400">{fecharegister}</td>
                                <td className="bg-red-50 border-l-4 border-red-400" > <IoAlertCircle fontSize={35} color="red" /></td>
                            </tr>
                        )}else{
                            return (
                                <tr>
                                    <td>{index.categoria}</td>
                                    <td>{index.Nombre} </td>
                                    <td>{index.Cantidad_total}</td>
                                    <td>{index.Price}</td>
                                    <td>{index.name}</td>
                                    <td>{fecharegister}</td>
                                    
                                </tr>
                            )
                        }})}
                </table>
            </tbody>

            <tbody>
                <table className="de">
                    <tr>
                        <th>Cantidad</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Opciones</th>
                    </tr>
                    <tr>
                            <td>  
                            <input 
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                name="Correo" 
                                type="text"
                                defaultValue={Product?.Nombre}
                            />
                        </td>
                        <td>  
                        <input 
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                type="number" 
                                name="cantidad" 
                                placeholder="No Documento"  
                                onChange={(e) => setCantidad(e.target.value)}
                                defaultValue={Product?.Cantidad}
                            />
                        </td>
                        <td>  
                        <input 
                                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                name="Correo" 
                                type="number"
                                onChange={(e) => setPrice(e.target.value)}
                                defaultValue={Product?.Precio}
                            />
                        </td>
                        
                        
                        <td><button  className="button-Border-Id"   onClick={handCLickServiceInsertStore} > <CiSquarePlus     fontSize={35} /> </button></td>
                    </tr>
                    
                           
                </table>
            </tbody>
        </div>
            </div>)

}

export default DetailStoreUpdate