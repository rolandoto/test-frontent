import React from "react"

const Checkout =()=>{

    return (
        <>
             <div className='App'>
                    <div className='container-img'>
                        <form className='form-login'  >
                                <label htmlFor="">Cliente</label>
                                <input  required placeholder='Cliente'  
                                        type='text' className='password'  
                                         />
                                    <select 
                                        className='select-hotel' >
                                        <option disabled >raiting tuype</option>
                                        <option>Grupo</option>
                                        <option>bebidas</option>  
                                    </select>          
                                    <input 
                                        required placeholder='Cantidad'  
                                        type='text' className='password'  
                                         />
                                    <input 
                                        required placeholder='Descuento' 
                                        type='text' className='password'  
                                         />

                                    <input 
                                        required placeholder='Valor' 
                                        type='text' className='password'  
                                         />
                                    <input 
                                        required placeholder='Total' 
                                        type='text' className='password'  
                                         />
                                <button className='button-login' type='submit' >Anotar a la lista</button>
                        </form>
                    </div>
                </div> 
        </>
    )
}

export default Checkout