import React, { useState, useEffect, useContext } from "react"
import AutoProvider from "../../privateRoute/AutoProvider"
import ServiceHotels from "../../service/ServiceHotels"
import { useHistory } from "react-router-dom"
import "./index.css"


const StoresListAdmin =() =>{

    const  {jwt} = useContext(AutoProvider)

    const history = useHistory()

    const [state,setState] = useState()

    useEffect(() =>{
        ServiceHotels({id:jwt.result.id_user}).then(index =>{
            setState(index)
        })
    },[])   

    const handNextStore =(e) =>{
        history.push(`/DetailStore/${e}`)
    }

    console.log(state)
    return(
        <div className="container-hotels" >
            {state?.map(index =>(
                <span className="hotel-img" src={index.logo} alt="" onClick={() => handNextStore(index.id_hotel)} >
                    {index.nombre}
                </span>
            ))}
        </div>
    )

}

export default StoresListAdmin