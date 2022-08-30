import React, { useState } from "react"
import UseForm from "../../hooks/UseForm"

const Checking =({name="",lastName="",phone="",endDate="",handNext=""}) =>{

    const end  = endDate ? endDate :null
    let today = new Date(end)
    const date = today?.toISOString().split('T')[0]

    const [datos, setDatos] = useState({
        nombre: name,
        apellido: lastName,
        celular:phone,
        fecha:date
    })

const handleInputChange = (event) => {
    setDatos({
        ...datos,
        [event.target.name] : event.target.value
    })
}
    
    const [raiting,setRaiting]= useState('')

    const cc =["CC","CE","PEP","P.P.T"]

    const handRaiting =(e) =>{
        setRaiting(e.target.value)
    }

    return (
        <div  className="App-Checking"  >
                <form className='form-login'  >
                        <select onChange={handRaiting}  
                                                value={raiting} 
                                                className='select-list-checking' >
                                                <option disabled >raiting tuype</option>
                                                <option>Tipo de Documentos</option>
                                                {cc?.map(ratings => <option >
                                                                        {ratings}
                                                                    </option> )}
                        </select>
                        <input 
                            required placeholder='Documento'
                            type='password'           
                            className='password'
                             />
                        <input required 
                            placeholder='Nombre'         
                            type='text'        
                            className='username' 
                            name="nombre"
                            onChange={handleInputChange}
                            value={datos?.nombre}
                            />    
                        <input 
                            required
                            placeholder='Apellido'  
                            type='text'           
                            className='password'
                            onChange={handleInputChange}
                            name="apellido"
                            value={datos?.apellido}
                             />
                        
                        <input required 
                            placeholder='Celular'         
                            type='text'        
                            className='username' 
                            onChange={handleInputChange}
                            name="celular"
                            value={datos?.celular}
                            />    
                        <input 
                            required 
                            placeholder='Correo Electronico'                                          
                            type='password'           
                            className='password'
                           />
                        <input required 
                            placeholder='Fecha de Salida'         
                            type='text'        
                            className='username'
                            onChange={handleInputChange}
                            name="fecha"
                            value={datos?.fecha}
                            /> 
                        <button className='button-login-checkin' type='submit' onClick={handNext} >Siguiente</button>
                    </form>
        </div>
    )

}
export default Checking