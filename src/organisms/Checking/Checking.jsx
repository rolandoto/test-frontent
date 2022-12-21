import React, { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import "./style.css"
import {useHistory} from "react-router-dom"
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Container from "../../Ui/Container";
import LoadingDetail from "../../Ui/LoadingDetail";


const Checking =() =>{

    const [search,setSearch] =useState("")
    const [reservas,SetReservas] =useState()
    const [preReservas,SetPresewrvas]=useState()
    const history = useHistory()

    useEffect(() =>{
		ServiceReservas().then(index=> {
			SetPresewrvas(index)
            setSearch(index)
		})
	},[setSearch])

    const handClick =(e) =>{
        history.push(`/detailchecking/${e}`)
    }
    
    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda= preReservas.filter((elemento,index)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ){
            return elemento;
            }
        });
        SetReservas(resultadosBusqueda);
        }

        console.log(reservas)
    const handChangeSearch =(e) =>{
        setSearch(e.target.value)
        filtrar(e.target.value)
    }


    const handClickNextWolking =() =>{
        history.push("/nochecking")
    }

    return  <>

    <Container>
           <div className="container-checking-global"   >

        
                            <div  >
                            <LoadingDetail  
                                                        loading={true}
                                                        titleLoading={"Buscar Reserva"}  />
                                
                                <div className="contain" >
                                    <div className="handclose" >
                                    
                                    </div>
                                </div>

                                <ul className="flex-bedrooms-checking-modal">  
                                
                                            <li  >      
                                              
                                                <input className="input-searching"  placeholder="Buscar Reservas" name="Buscar" type="text" onChange={handChangeSearch} />
                                            
                                            </li>

                                            <li>
                                                        <button className="button-wolking" onClick={handClickNextWolking} ><HiOutlinePlusCircle fontSize={30} color="white"  /> <span>Wolking</span>  </button>
                                            </li>

                                </ul>

                                <div className="container-search-filter" >
                                {reservas?.map((index,e) =>( 
                                    <section className='section-Search' key={`section-${e}`} >
                                            <ul className='border-search' onClick={(e) => handClick(index.id)} >
                                                    <li>
                                                        <div >
                                                            <div className='flex-Autocomplete'>
                                                                <a className='hover:bg-blue-300 flex gap-4 p-4'>
                                        
                                                                <div className='flex-'>
                                                                    <h3 className='text-sm font-semibold'>Reserva: {index.title}</h3>
                                                                    <h3 className='text-sm font-semibold'>Nombre de la Reserva: {index.name}</h3>
                                                                </div>
                                                                </a>
                                                            </div>   
                                                        </div>
                                                    </li>

                                                   
                                            </ul>
                                  
                                    </section>
                                ))}
                                </div>
                                </div>
                        </div>

            </Container >
                    
        </>

}
export default Checking