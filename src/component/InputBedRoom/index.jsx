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
            <ul className="select-hotel-type-admin" >
               

                <li>
                            <label className="title-stores" >Tipos de Habitacion</label>
                            <select onChange={handleInputChange}  
                                    name="id_habitaciones"
                                    className='select-hotel-type-admin-hotels'
                            >
                                <option >Seleccionar Tipos de habitaciones</option>
                                {mapresult?.map(category =>(
                                    <option 
                                    value={category.ID}   
                                    key={category.ID}
                                >
                                    {category.nombre}
                                </option>
                                )
                                )}
                            </select>
                        </li>
                                    
                        <li>
                                <label className="title-stores">Numero o Nombre</label>
                                <input className="input-selecto-dasboard-n1-admin-hotels"  
                                        name={"name_num"} 
                                        type="text" 
                                        onChange={handleInputChange}
                                        placeholder="Numero o Nombre" />
                            </li>

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