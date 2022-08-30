import React, { useState } from "react"
import {BsFileEarmarkPdf} from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";

const Imbox =({imbox,title}) =>{

    const [date,setDate] = useState()
    const [product,setProduct] =useState() 
    const [worth,setWorth] =useState() 
    
    return (
        <>        
            <div className="App-Checking" >
                <button className="Button-bicta">{title}</button>
                    <form className='form-login' >
                            <input required 
                                type='date'        
                                className='username' 
                                name="celular"
                                value={date}
                                placeholder='Fecha'  
                                onChange={(e) => setDate(e.target.value)}
                                />    
                            <input required 
                                placeholder='Producto'         
                                type='text'        
                                className='username'
                                name="product"
                                value={product}
                                onChange={(e) => setProduct(e.target.value)}
                                />
                            <input required 
                                placeholder='Valor'         
                                type='text'        
                                className='username'
                                name="valor"
                                value={worth}
                                onChange={(e) => setWorth(e.target.value)}
                                /> 
                        <div className="container-imbox" >
                            <button className='button-login-checkin' type='submit' ><AiFillPlusCircle size={30} color="white"/></button>
                            <button className='button-login-checkin' type='submit' > <BsFileEarmarkPdf color="white" size={30} /></button>
                        </div>
                    </form>
            </div>
            <div className="App-Checking" >
                <table className="tab-imbox">
                    <thead className="go">
                        <tr>
                            <th>Fecha</th>
                            <th>Producto</th>
                            <th>Valor</th>
                        </tr>
                    </thead>

                        {imbox.link?.map(index =>{
                            let today = new Date(index.date )
                            const result = today.toISOString().split('T')[0]
                            if(!result) return null
                            
                            return (
                                <tr key={index.id}>
                                    <td>{result}</td>
                                    <td>{index.producto}</td>
                                    <td>{index.valor}</td>
                                </tr>
                            )
                        })}
                        
                    </table>
            </div>
    </>
    )
}

export default Imbox