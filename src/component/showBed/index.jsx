import React, { useState } from "react";
import CardBed from "../CardBed";
import {Link} from "react-router-dom"
import UseUsers from "../../hooks/UseUser";
import { BiBed } from "react-icons/bi";
import { useHistory } from "react-router-dom";

const ShowBed =({bed}) =>{

    const history = useHistory()

    const [state,setState] = useState(false)

    const [num,setNum] = useState()

    const handModal =(e) =>{
        setNum(e)
        setState(true)
    }

    const handClose =() =>{
        setState(false)
    }

    const handNextCheckin =()=>{
        history.push(`/Detail/${num}`)
    }

    const handNextCheckout =()=>{
        history.push(`/Checkout/${num}`)
    }

    const handNextQr =()=>{
        history.push(`/Qr`)
    }

    return (
        <div>            
            <div className='check'>
                {state && <div className="border-ri" >
                        <div className="content-Modal" >
                                <div className="handclose" onClick={handClose}>
                                    x
                                </div>
                                <button className="button-login" onClick={handNextCheckin} >checkin</button>
                                <button className='button-login' onClick={handNextCheckout}  >Check-out</button>
                                <button className='button-login'>bloquear</button>
                                <button className='button-login'>Disponible</button>
                                <button className='button-login'>Limpieza</button> 
                                <button className='button-login' onClick={handNextQr}>Leer Qr</button> 
                        </div>  
                </div>}
                {bed.map((index,e) =>(
                    <div className="icon-bed" onClick={()=> handModal(e)} >
                        <CardBed  key={e}  index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowBed