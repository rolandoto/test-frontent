import React, { useContext, useEffect,useState } from "react";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import { AiOutlineSearch } from "react-icons/ai";
import {useHistory} from "react-router-dom"
import AutoProvider  from "../../privateRoute/AutoProvider";
import LoadingDetail from "../../Ui/LoadingDetail";
import { BsCalendarX } from "react-icons/bs";
import ServiceUpdateReservationWeb from "../../service/ServiceUpdateReservationWeb";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";

const TemplateSearch =() =>{
    const {jwt} =useContext(AutoProvider)
    const [username,setUsername] =useState("")
    const [loading,setLoading] =useState(false)
    const history = useHistory()

    const {error,Items,Room,filterRoom
	} = useSelector((state) => state.ReservationSlice)

    const handCreateReservation =(e) =>{
        history.push("/Createreservaction")
    }

    const filtrarSearching =(terminoBusqueda) =>{
        let resultadosBusqueda= Items.filter((elemento,index)=>{
            if(elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.document?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.Codigo_Reserva?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.full_name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
       return {resultadosBusqueda}
    }


    const handChange =(e) =>{
        setUsername(e.target.value)
    }

    const handHistory =(e) =>{
        history.push(`/DetailDashboard/${e}`)
    }


    const handCLickUdpate =(e) => {      
        ServiceUpdateReservationWeb({id:e,cancelado:1}).then(index=>{
            console.log(index)
            setLoading(true)
            
        }).catch(e=> {
            console.log(e)
            setLoading(false)
        })
    }


   const {resultadosBusqueda} = filtrarSearching(username)  

    return (

        <>
        <div className="container-bicta" >

                <div className="contain-search">
                    <ul className="flex-bedrooms-search">   
                            <li>
                                <label className="title-stores">Busquedas de Reservas:</label>
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        value={username}
                                        onChange={handChange}   
                                        placeholder="No Documento,No reservas o Nombre" />
                            </li>   
                    </ul>
                </div>
              
                 <table  className="de"  >
                    <tbody class="tbody"  > 
                <thead >
                <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha entrada</th>
                        <th>Fecha salida</th>
                        <th>Codigo reserva</th>
                        <th>Abono</th>
                        <th>Total hospedaje</th>
                        <th>Prefijo</th>
                        <th>Celular</th>
                        <th>Nacionalidad</th>
                        <th>Medio</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                  {resultadosBusqueda?.map(index =>{
                     let todaydesde = new Date(index.start_time)
                     const desde = todaydesde.toISOString().split('T')[0]

                     let todayhasta = new Date(index.end_time)
                     const hasta = todayhasta.toISOString().split('T')[0]

                     const valor_habitacion =  parseInt(index.valor_habitacion)

                     const abono = parseInt(index.abono)

                     const ID_Canal = parseInt(index.abono)

                    if(index.state ==0)
                        console.log("Información de depuración para el elemento actual:", index);
                        return (
                        <tr className="" >
                            <td> </td>
                            <td>{index.name}</td>
                            <td>{index.last_name}</td>
                            <td> Desde {desde}</td>
                            <td> Hasta {hasta}</td>
                            <td>{index.Codigo_Reserva}</td>
                            <td>${abono.toLocaleString()}</td>
                            <td>${valor_habitacion.toLocaleString()}</td>
                            <td>{index.codigo}</td>
                            <td>{index.Celular}</td>
                            <td>{index.nacionalidad}</td>
                            <td>$prueba</td>
                            <td>
                            <button className="button-dasboard-thre-search-view"  onClick={() => handHistory(index.id)} >
                                        <span>ver</span> 
                                </button>
                            </td>
                     </tr>
                    )} 
                  )}
                  </tbody>
            </table>
        </div>
        </>
    )
}
export default TemplateSearch
