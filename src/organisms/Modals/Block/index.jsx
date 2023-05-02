import React, { useContext, useEffect, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io";
import AutoProvider from "../../../privateRoute/AutoProvider";
import ServiceRoomsAviable from "../../../service/ServiceRoomsAvaible";
import ServicetypeRooms from "../../../service/ServicetypeRooms";
import Input from "../../../Ui/Input";
import Selected from "../../../Ui/Select";
import "../Cleanline/index"
import { Loading ,Grid} from "@nextui-org/react";
import ServiceAvaiblereservation from "../../../service/ServiceAviableReception";
import LoadingDetail from "../../../Ui/LoadingDetail";
import { config } from "../../../config";
import ServiceBlockRoom from "../../../service/ServiceBlockByRoom";

const ModalBlock =({block,handCloseBlock}) =>{

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

    console.log(change)

    const [disponibilidad,setDisponibilidad] =useState()

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



    const habi = state?.map(index => {
        const ID = index.id_tipoHabitacion
        const {nombre} = index
        return {nombre,ID}
    })

    const [loadinghabilitada,setLoadinghabilitada] =useState({loading:false,error:false})


    const Nombre = "Bloqueada"
    
    const handClick =() =>{
        ServiceBlockRoom({id:jwt.result.id_hotel,desde:dataAvaible.desde,hasta:dataAvaible.hasta,ID_Habitaciones:change.disponibilidad,ID_Tipo_Estados_Habitaciones:2,Nombre}).then(index => {
           window.location.reload()
        }).catch(e => {
            setLoadinghabilitada({error:true})
            console.log(e)
        })
    }

    

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getroomdetalle/${change.habitaciones}`)
        .then(index=> index.json())
        .then(data =>setDisponibilidad(data))
    },[change.habitaciones])

   


    return (
        <>
        {block &&
            <div className="border-ri modalNewBooking">
                <div className="content-Modal-dasboard">
                    <div className="contain" >
                            <div className="handclose">
                            <IoMdCloseCircle fontSize={30} color="black"  onClick={handCloseBlock} />
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
                                                        
                            <ul className="flex-bedrooms">
                                <li>
                                    <label className="title-stores" >Asignar Habitacion</label>
                                    <select onChange={handleInputChange}  
                                            name="disponibilidad"
                                            className='select-hotel-type-one'>
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
                        </ul>
                        
                            <ul className="container-button-dasboard" >
                                <li>
                                    <button className="button-Block-One"  onClick={handClick} >
                                       Bloquear Habitacion
                                    </button>
                                </li> 
                            </ul> 
                    </div>
                </div>
            </div>
        }
        </>
    )

}
export default ModalBlock