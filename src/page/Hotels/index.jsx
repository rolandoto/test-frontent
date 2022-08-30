import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import AutoProvider from "../../privateRoute/AutoProvider"
import ServiceHotels from "../../service/ServiceHotels"
import {useHistory} from "react-router-dom"
import "./index.css"


const Hotels =() =>{

    const  {jwt} = useContext(AutoProvider)

    const history = useHistory()

    const [state,setState] = useState()

    useEffect(() =>{
       ServiceHotels({id:jwt.result.id_user}).then(index =>{
            setState(index)
       })
    },[])   

    const handNextBedrooms =(e) =>{
        history.push(`/DetailBedRoom/${e}`)
    }

    return(
        <div className="container-hotels" >
            {state?.map(index =>(
                    <img className="hotel-img" src={index.logo} alt="" onClick={() => handNextBedrooms(index.id_hotel)}  />
            ))}
        </div>
    )

}

export default Hotels