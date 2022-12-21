import React, { useContext, useEffect, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io";
import AutoProvider from "../../../privateRoute/AutoProvider";
import ServiceRoomsAviable from "../../../service/ServiceRoomsAvaible";
import ServicetypeRooms from "../../../service/ServicetypeRooms";
import Input from "../../../Ui/Input";
import Selected from "../../../Ui/Select";
import "./style.css"
import { Loading ,Grid} from "@nextui-org/react";
import ServiceAvaiblereservation from "../../../service/ServiceAviableReception";

const ModalCleanLine =({cleanline,hanClickCloseCleanline}) =>{

    const [avaible,setAvaible] =useState(null)
    const {jwt} =useContext(AutoProvider)
    const [loadingAvaible,setLoadingAvaible] =useState({loading:false,error:true})
    const [state,setState] =useState()
    const [loadingReservation,setLoadingReservation] =useState({loading:false,error:false})
    const [change,setChange] =useState({
        desde:null,
        hasta:null,
        habitaciones:null,
        disponibilidad:null
    })

    console.log(change)

    const handleInputChange =(event) =>{
        setChange({
            ...change,
            [event.target.name]:event.target.value
        })
    }

    const dataAvaible ={
        desde:`${change.desde} 15:00:00`,
        hasta:`${change.hasta} 13:00:00`,
        disponibilidad:change.disponibilidad,
        habitaciones:change.habitaciones,
        id_estados_habitaciones:1
    }


    useEffect(() =>{
        ServicetypeRooms({id:jwt.result.id_hotel}).then(index =>{
            setState(index)
        })
    },[setState])

    console.log(change)
    const habi = state?.map(index => {
        const ID = index.id_tipoHabitacion
        const {nombre} = index
        return {nombre,ID}
    })

    const handClick =() =>{
        setLoadingAvaible({loading:true})
        ServiceRoomsAviable({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones}).then(index =>{
            setLoadingAvaible({loading:false,error:false})
            setAvaible(index)
            console.log(index)
        }).catch(e =>{
            setLoadingAvaible({error:true})
        })
    }

    console.log(dataAvaible)

    const handClickReservation =() =>{
        setLoadingReservation({loading:true})
        ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad,id_estados_habitaciones:1}).then(index =>{
            setLoadingReservation({loading:false})
            window.location.reload();
            console.log(index)
        }).catch(e =>{
            setLoadingReservation({error:true})
        })
    }

    const Loader =() =>{

        if(loadingAvaible.loading){
            return (
                <div>
                    
                    <Grid.Container gap={2}  >
                            <Grid> 
                                <Loading type="default" />
                            </Grid>
                    </Grid.Container>
        
                </div>
            )
        }
        
        return (
            <>
                    {!loadingAvaible.error && <div>
                            <div className="title-modal-dashboard" >
                            <h1>Habitaciones Disponibles</h1>
                        </div>
                    
                            <li>
                            <label className="title-stores" >Habitaciones Disponibles</label>
                            <select onChange={handleInputChange}  
                                    name="disponibilidad"
                                    className='select-hotel-type'
                            >
                                <option>Selecion la habiatacion</option>
                                {avaible?.queryDefinid?.map(category =>(
                                    <option 
                                    value={category.ID}   
                                    key={category.ID}
                                >
                                    {category.Numero}
                                </option>
                                )
                                )}
                            </select>
                        
                        </li>
                        </div>
                        }
                </>
        )
    }


    return (
        <>
        {cleanline &&
            <div className="border-ri modalNewBooking">
                <div className="content-Modal-dasboard">
                    <div className="contain" >
                            <div className="handclose">
                            <IoMdCloseCircle fontSize={30} color="black"  onClick={hanClickCloseCleanline} />
                            </div>

                            <ul className="flex-bedrooms">
                                                <Input  title="Fecha desde"  
                                                        type="date" 
                                                        name="desde"
                                                        change={handleInputChange} 
                                                        />
                                                <Input  title="Fecha hasta" 
                                                        type="date" 
                                                        name="hasta"
                                                        change={handleInputChange} 
                                                         />
                                                <Selected 
                                                        title="Tipo de habitacion" 
                                                        state={habi} 
                                                        name="habitaciones" 
                                                        change={handleInputChange}
                                                         />
                                            </ul>
                            <ul className="container-button-dasboard" >
                                <li>
                                    <button className="button-CleanLine" onClick={handClick}  >
                                        Buscar  Habitaciones
                                    </button>
                                </li> 
                            </ul> 

                            {Loader()}

                            {!loadingAvaible.error && <ul className="container-button-dasboard" >
                                <li>
                                    <button className="button-CleanLine"  onClick={handClickReservation}  >
                                        Bloquear habitacion
                                    </button>
                                </li> 
                            </ul> 
                            }

                    </div>
                </div>
            </div>
        }
        </>
    )

}
export default ModalCleanLine