import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import HttpClient from "../../HttpClient"
import ServiceInsertInto from "../../service/ServiceInsertRooms"
import ServicetypeRooms from "../../service/ServicetypeRooms"
import Input from "../../Ui/Input"
import Selected from "../../Ui/Select"

const InputBedRoom =({id,fetchData}) =>{

    const [state,setState] = useState()
    const [loading,setLoading] =useState({loading:false,error:false})

    useEffect(() =>{
        ServicetypeRooms({id}).then(index =>{
            setState(index)
        })
    },[setState])

    const [change,setChange] =useState({
        id_hotel:id,
        id_habitaciones:"",
        name_num:""
    })    
    
    const handleInputChange = (event) => {
        setChange({
            ...change,
            [event.target.name] : event.target.value
        })
    }

    const handSubmitRooms= async() =>{
        
       try {
            const to = await HttpClient.post(change).then(index =>{
                console.log(index)
                fetchData()
            }).catch(e => {
                console.log("error")
            })
            console.log(to)
       }catch (error) {
            console.log(error)    
        }
    }

    console.log(change)

    const mapresult = state?.map(index=> {
        const ID  = index.id_tipoHabitacion
        const  {id_hotel,id_tipoHabitacion,max_persona,nombre,persona,precio,precio_persona} =index
        return { id_hotel,ID,id_tipoHabitacion,max_persona,nombre,persona,precio,precio_persona}
    })

    return (
        <>
            <ul className="flex-bedrooms-detailroom" >
                    
                <Selected 
                        title="Tipos de Habitacion" 
                        change={handleInputChange}  
                        name="id_habitaciones" 
                        state={mapresult} 
                        />
                
                <Input 
                        title="Numero o Nombre" 
                        name="name_num"
                        change={handleInputChange}     />

                <li>
                    <button className="button-bedroom" onClick={handSubmitRooms} >
                       Agregar
                    </button>
                </li>       
            </ul> 
        </>
    )
}

export default InputBedRoom