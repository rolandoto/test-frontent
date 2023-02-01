import React from "react"
import { AiFillPlusCircle } from "react-icons/ai";

const InputBictacoras =({ubicacione,setBbicacion,descriptione,setDescription,handSubmitBictacoras}) =>{

    return (
            <div className="container-bicta" onSubmit={handSubmitBictacoras} >
                <div >
                <form className='form-login'  >
                    <input required 
                        placeholder='Ubicacion'         
                        type='text'        
                        className='username' 
                        name="celular"
                        value={ubicacione}
                        onChange={(e) => setBbicacion(e.target.value) }
                        />    
                    <input required 
                        placeholder='Descripcion'         
                        type='text'        
                        className='username'
                        name="fecha"
                        value={descriptione}
                        onChange={(e) => setDescription(e.target.value)}
                        /> 
                        <button className='button-login-checkin' type='submit'  ><AiFillPlusCircle size={30} color="white" /></button>
                </form>
            </div>  
        </div>
    )
}
export default InputBictacoras