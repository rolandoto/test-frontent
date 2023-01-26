import React, { useContext, useEffect, useState } from "react";
import ServiceHotels from "../../service/ServiceHotels";
import {useHistory} from "react-router-dom"
const HotelDashboard =() =>{

    const history = useHistory()


    const [state,setState] = useState()

    useEffect(() =>{
       ServiceHotels({id:"5"}).then(index =>{
            setState(index)
       })
    },[])   

    const handNextBedrooms =(e) =>{
        history.push(`/Home/${e}`)
    }

    return (
           <div className="container-hotels" >
            {state?.map(index =>(
                    <span className="hotel-img-admin" src={index.logo} alt="" onClick={() => handNextBedrooms(index.id_hotel)}  >
                        {index.nombre}
                    </span>
            ))}
        </div>
    )

}
export default HotelDashboard