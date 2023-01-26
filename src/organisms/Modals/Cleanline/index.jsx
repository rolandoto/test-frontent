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
import LoadingDetail from "../../../Ui/LoadingDetail";

const ModalCleanLine =({cleanline,hanClickCloseCleanline}) =>{

    const [avaible,setAvaible] =useState(null)
    const {jwt} =useContext(AutoProvider)
    const [loadingAvaible,setLoadingAvaible] =useState({loading:false,error:true})
    const [state,setState] =useState()
    const [loadingReservation,setLoadingReservation] =useState({loading:false,error:false})
    const [change,setChange] =useState({
        desde:``,
        hasta:null,
        habitaciones:null,
        disponibilidad:null,
        adultos:0,
        niños:0,
        infantes:0,
        tipo_documento:"",
        numero_documento:"",
        ciudad:"",
        nombre:"",
        apellido:"",
        celular:"",
        fecha_nacimiento:"",
        correo:"",
        descuento:"",
        talla_perro:0,
        canal_reserva:0,
        observacion:"",
        ID_Tipo_Forma_pago:0,
        abono:0,
        descuento:"",
        valor:"",
    })


    const [huespe,setHuespe] =useState(
        [{
            Tipo_documento:"",
            Num_documento:"",
            Nombre:"",
            Apellido:"",
            Celular:"",
            Correo:"",
            Fecha_nacimiento:"",
            Ciudad:"",
            Nacionalidad:""
        }]
    )

    const handleInputChange =(event) =>{
        setChange({
            ...change,
            [event.target.name]:event.target.value
        })
    }

    const dataAvaible ={
        desde:`${change.desde} 15:00:00`,
        hasta:`${change.hasta} 13:00:00`,
        habitaciones:change.habitaciones,
        disponibilidad:change.disponibilidad
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

    const [loadinghabilitada,setLoadinghabilitada] =useState({loading:false,error:false})
    const handClick =() =>{
        ServiceRoomsAviable({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,ID_Habitaciones:change.disponibilidad}).then(index =>{
            console.log({"aceptado":index})
            setLoadinghabilitada({loading:true})
        }).catch(e =>{
            setLoadinghabilitada({error:true})
        })
    }

    const handClickReservation =() =>{
        setLoadingReservation({loading:true})
        ServiceAvaiblereservation({desde:dataAvaible.desde,hasta:dataAvaible.hasta,habitaciones:dataAvaible.habitaciones,disponibilidad:dataAvaible.disponibilidad,id_estados_habitaciones:1,ID_Canal:change.canal_reserva,Adultos:change.adultos,Ninos:change.niños,ID_Talla_mascota:0,Infantes:change.infantes,Noches:0,huespe,Observacion:0,valor:0,ID_Tipo_Forma_pago:change.ID_Tipo_Forma_pago,abono:0,valor_habitacion:0,Tipo_persona:0,huespe}).then(index =>{
            setLoadingReservation({loading:false})
            window.location.reload();
            console.log(index)
        }).catch(e =>{
            console.log(e)
            setLoadingReservation({error:true})
        })
    }


    const [disponibilidad,setDisponibilidad] =useState()
    useEffect(() =>{
        fetch(`http://localhost:4000/api/resecion/getroomdetalle/${change.habitaciones}`)
        .then(index=> index.json())
        .then(data =>setDisponibilidad(data))
    },[change.habitaciones])

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

                            <LoadingDetail     error={loadinghabilitada.error}  
                                                                    title="la habitacion no esta habilidata" />
                            <LoadingDetail  
                                            loading={loadinghabilitada.loading}
                                            titleLoading={"la habitacion esta habilitadad"}  />

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
                            

                            <ul className="flex-bedrooms">
                                <li>
                                    <label className="title-stores" >Asignar Habitacion</label>
                                    <select onChange={handleInputChange}  
                                            name="disponibilidad"
                                            className='select-hotel-type-rooms'>
                                        <option></option>
                                        {disponibilidad?.query?.map(category =>(
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
                            </ul>


                            <ul className="container-button-dasboard" >
                                <li>
                                    <button className="button-CleanLine"  onClick={handClick}  >
                                       Validar
                                    </button>
                                </li> 
                            </ul> 
                          
                            {loadinghabilitada.loading&&<ul className="container-button-dasboard" >
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