import React, { useContext, useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { ServiceReservas } from "../../page-resesion/Dashboard/dummy_data";
import "./style.css"
import {useHistory} from "react-router-dom"
import { HiOutlinePlusCircle } from "react-icons/hi2";
import Container from "../../Ui/Container";
import LoadingDetail from "../../Ui/LoadingDetail";
import  AutoProvider  from "../../privateRoute/AutoProvider";


const Checking =() =>{

    const [search,setSearch] =useState("")
    const [reservas,SetReservas] =useState()
    const [preReservas,SetPresewrvas]=useState()
    const {jwt} = useContext(AutoProvider)
    const history = useHistory()

    useEffect(() =>{
		ServiceReservas({id:jwt.result.id_hotel}).then(index=> {
			SetPresewrvas(index)
            setSearch(index)
		})
	},[setSearch])

    const handClick =(e) =>{
        history.push(`/detailchecking/${e}`)
    }

    console.log(preReservas)

    const filtrar=(terminoBusqueda)=>{
        let resultadosBusqueda= preReservas.filter((elemento,index)=>{
            if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
             ||elemento.document.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
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
           <div className="container-checking-global">
                            <div>
                           

                                <div className="contain-search">
                    <LoadingDetail   titleLoading={"Busquedad Checking"} 
                            loading={true}
                            />
                    <ul className="flex-bedrooms-search">   
                            <li>
                                <label className="title-stores">Busquedas de Reservas:</label>

                                     <input className="input-stores-personality-nine-search"  placeholder="Buscar Reservas" name="Buscar" type="text" onChange={handChangeSearch} />
                            </li>   
                            <li>
                                <button className="button-dasboard-thre-search-finish" onClick={handClickNextWolking} ><HiOutlinePlusCircle fontSize={30} color="white"  /> <span>Wolking</span>  </button>
                            </li>
                    </ul>

                    
                </div>

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