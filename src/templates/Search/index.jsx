import React, { useContext, useEffect,useState } from "react";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import { AiOutlineSearch } from "react-icons/ai";
import {useHistory} from "react-router-dom"
import AutoProvider  from "../../privateRoute/AutoProvider";
import LoadingDetail from "../../Ui/LoadingDetail";

const TemplateSearch =() =>{
    const {jwt} =useContext(AutoProvider)
    const [username,setUsername] =useState()
    const [state,setState] =useState()
    const [searching,setSearching] =useState()
    const history = useHistory()

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

    return (
        <div className="container-search" >  
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
                        
                                <button className="button-dasboard-thre-search-finish"  >
                                        <span>Hacer check in</span> 
                                </button>
                            </li>
                    </ul>

                    
                </div>
                <table className="table-search" >
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
        </div>
    )
}
export default TemplateSearch
