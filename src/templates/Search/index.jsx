import React, { useContext, useEffect,useState } from "react";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import { AiOutlineSearch } from "react-icons/ai";
import {useHistory} from "react-router-dom"
import AutoProvider  from "../../privateRoute/AutoProvider";
import LoadingDetail from "../../Ui/LoadingDetail";
import { BsCalendarX } from "react-icons/bs";
import ServiceUpdateReservationWeb from "../../service/ServiceUpdateReservationWeb";

const TemplateSearch =() =>{
    const {jwt} =useContext(AutoProvider)
    const [username,setUsername] =useState()
    const [state,setState] =useState()
    const [searching,setSearching] =useState()
    const [reservas,setReservation] =useState()
    const [loading,setLoading] =useState(false)
    const history = useHistory()

    const handCreateReservation =(e) =>{
        history.push("/Createreservaction")
    }

    useEffect(() =>{
        ServiceReservas({id:jwt.result.id_hotel}).then(index=>{
            setState(index)
            setSearching(index)
        })
    },[])

    const filtrarSearching =(terminoBusqueda) =>{
        let resultadosBusqueda= state.filter((elemento,index)=>{
            if(elemento.name?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            || elemento.document?.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
        setSearching(resultadosBusqueda);
    }

    const handChange =(e) =>{
        setUsername(e.target.value)
        filtrarSearching(e.target.value)
    }

    const handHistory =(e) =>{
        history.push(`/DetailDashboard/${e}`)
    }


    useEffect(() =>{
        fetch(`https://grupo-hoteles.com/api/getListReservas?id_hotel=${jwt.result.id_hotel}`)
        .then(resp=>resp.json())
        .then(data=> setReservation(data))
    },[loading,setReservation])

    const handCLickUdpate =(e) => {      
        ServiceUpdateReservationWeb({id:e,cancelado:1}).then(index=>{
            console.log(index)
            setLoading(true)
            
        }).catch(e=> {
            console.log(e)
            setLoading(false)
        })
    }


    /**   <tbody>
        <table  className="de"  >
                <thead >
                    <tr>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                {forget.map((index,e) => {
                    let today = new Date(index.date )
                    const result = today.toISOString().split('T')[0]
                    if(!result) return null
                    return (
                        <tr key={e}>   
                            <td>{result}</td>
                            <td>{index.ubicacion}</td>
                            <td>{index.description}</td>
                    </tr>
                    )
                })} 
</table>
</tbody> 
*/  

console.log(searching)

    return (
        <div className="container-bicta" >  
                <div className="contain-search">
                    <LoadingDetail   titleLoading={"Busqueda Reservas"} 
                            loading={true}
                            />
                    <ul className="flex-bedrooms-search">   
                            <li>
                                <label className="title-stores">Busquedas de Reservas:</label>
                                <input  className="input-stores-personality-nine-search"  
                                        name="Ciudad"
                                        value={username}
                                        onChange={handChange}   
                                        placeholder="No Documento,No reservas o Nombre" />
                            </li>   
                            <li>
                                <button className="button-dasboard-thre-search-finish-finish-one"  onClick={handCreateReservation} >
                                        <span>Crear Reserva</span> 
                                </button>
                            </li>
                            <li>
                        
                        <button className="button-dasboard-thre-search-finish"  >
                                <span>Hacer check in</span> 
                        </button>
                    </li>
                    </ul>

                    
                </div>
                <tbody>
                 <table  className="de"  >
                  {searching?.map(index =>{
                     let todaydesde = new Date(index.start_time)
                     const desde = todaydesde.toISOString().split('T')[0]

                     let todayhasta = new Date(index.end_time)
                     const hasta = todayhasta.toISOString().split('T')[0]

                    if(index.state ==0)
                        return (
                        <tr className="table-color" >
                            <td> <span  className="imbox-search"  ><AiOutlineSearch color="black" /></span> </td>
                            <td>{index.name}</td>
                            <td>{index.last_name}</td>
                            <td> Desde {desde}</td>
                            <td> Hasta {hasta}</td>
                            <td>
                            <button className="button-dasboard-thre-search-view"  onClick={() => handHistory(index.id)} >
                                        <span>ver</span> 
                                </button>
                            </td>
                     </tr>
                    )} 
                    
                  )}
                </table>
                </tbody>
                <tbody>
                    <table  className="de"  >
                            <thead >
                                <tr>
                                    <th>Codigo</th>
                                    <th>Hotel</th>
                                    <th>Nombre habitación</th>
                                    <th>Fecha entrada</th>
                                    <th>Fecha salida</th>
                                    <th>Noches</th>
                                    <th>Adultos</th>
                                    <th>Niños</th>
                                    <th>Precio</th>
                                    <th>Nombre completo</th>
                                    <th>Celular</th>
                                    <th>Cancelar</th>
                                </tr>
                            </thead>
                            {reservas?.map((index,e) => {
                                if(index.cancelado !=1)
                                return (
                                    <tr key={e}>   
                                        <td>X14A-{index.id} </td>
                                        <td>{index.nameHotel}</td>
                                        <td>{index.nameHotel}</td>
                                        <td>{index.startDate}</td>
                                        <td>{index.endDate}</td>
                                        <td>{index.nigths}</td>
                                        <td>{index.adults}</td>
                                        <td>{index.children}</td>
                                        <td>{index.price}</td>
                                        <td>{index.name} {index.lastName}</td>
                                        <td>{index.phone}</td>
                                        <td className="cursor-one" ><BsCalendarX fontSize={25} onClick={() =>handCLickUdpate(index.id)} /> </td>
                                </tr>
                                )

                                if(index.cancelado ==1)
                                return (
                                    <tr key={e}>    
                                        <td>X14A-{index.id}  <span className="cancel" >Cancelado</span> </td>
                                        <td>{index.nameHotel}</td>
                                        <td>{index.nameHotel}</td>
                                        <td>{index.startDate}</td>
                                        <td>{index.endDate}</td>
                                        <td>{index.nigths}</td>
                                        <td>{index.adults}</td>
                                        <td>{index.children}</td>
                                        <td>{index.price}</td>
                                        <td>{index.name} {index.lastName}</td>
                                        <td>{index.phone}</td>
                                        
                                </tr>
                                )
                            })} 
            </table>
            </tbody> 
                
        </div>
    )
}
export default TemplateSearch
