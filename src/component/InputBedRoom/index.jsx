import React from "react"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import  AutoProvider  from "../../privateRoute/AutoProvider"
import ServiceInsertInto from "../../service/ServiceInsertRooms"
import ServicetypeRooms from "../../service/ServicetypeRooms"

const InputBedRoom =({id}) =>{

    const [state,setState] = useState()
    const [loading,setLoading] =useState({loading:false,error:false})

    useEffect(() =>{
        ServicetypeRooms({id}).then(index =>{
            setState(index)
        })
    },[setState])

    const [raiting,setRaiting]= useState()
    const [name,setName] =useState()
    
    const handRaiting =(e)=>{
        setRaiting(e.target.value)
    } 

    const handChangeName=(e) =>{
        setName(e.target.value)
    }

    
    const handSubmitRooms =() =>{
        setLoading(({loading:true}))
       ServiceInsertInto({id_hotel:id,id_habitaciones:raiting,name_num:name}).then(index =>{
            setLoading({loading:false})
            alert("guardado")
            setName("")
       }).catch(e =>{
            setLoading({error:true})
       })
    }

    

    return (
        <>
            <ul className="flex-bedrooms" >
                {loading.error && <h1>error al Guardar</h1>}
                {loading.loading && <h1> Guardardo</h1>}

                <li>
                <label className="title-bedroom" >Tipo de habitacion</label>
                <select onChange={handRaiting}  
                                        value={raiting} 
                                        className='select-hotel-type' >
                                        <option disabled >raiting tuype</option>
                                        <option>Seleccionar Hotel</option>
                                        {state?.map(ratings => <option 
                                                                    value={ratings.id_tipoHabitacion}   
                                                                    key={ratings.id_tipoHabitacion}>
                                                                        {ratings.nombre}
                                                                </option> )}
                                    </select>
                </li>
                <li>
                    <label className="title-bedroom"  >Numero o Nombre</label>
                     <input className="input-bedroom" value={name}  type="text" onChange={handChangeName} />
                </li>
                <li  >
                    <button className="button-bedroom" onClick={handSubmitRooms} >
                       Agregar
                    </button>
                </li>       
                
            </ul> 
        </>
    )
}

export default InputBedRoom