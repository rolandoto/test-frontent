import React, { useEffect, useState } from "react"
import Checking from "../../component/Checkin"
import UseReservas from "../../hooks/UseReservas"

const Qr =() =>{

    const [qr,setQr]= useState()
    const {handBookin,booking,isLoading,isError} = UseReservas()
    
    const handSubmit =(e)=>{
        e.preventDefault()
        handBookin({id:qr})   
    }

    return  (
        <div className="App-qr" >
            <h1>leer qr</h1>
            {booking  ? 
                <div>
                    {booking?.map((index,e) =>(
                        <Checking  {...index} key={e}  />
                    ))}
                </div>
                        :
                (
                    <form className='form-login' onSubmit={handSubmit}  >
                        <input required 
                            placeholder='Leer Qr'         
                            type='password'        
                            className='username' 
                            value={qr}
                            onChange={(e) => setQr(e.target.value)}
                            />                 
                </form>
                )
            }

            {isLoading && <h1>cargando</h1>}
            {isError && <h1>error no tienes registro </h1>}
                
        </div>
    )
}  

export default Qr