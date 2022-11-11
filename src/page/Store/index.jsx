import React, {useContext, useEffect, useState} from "react"
import "./index.css"
import UseTitle from "../../hooks/UseTitle";
import  AutoProvider from "../../privateRoute/AutoProvider";
import {useHistory} from "react-router-dom"
import ServiceHotels from "../../service/ServiceHotels";
const Store =() => {
    
    UseTitle({title:"Store"})

    const  {jwt} = useContext(AutoProvider)

    const history = useHistory()

    const [state,setState] = useState()

    useEffect(() =>{
       ServiceHotels({id:jwt.result.id_user}).then(index =>{
            setState(index)
       })
    },[])   

    const handNextBedrooms =(e) =>{
        history.push(`/DetailStorerecepcion/${e}`)
    }

    return (
      <div className="container-hotels" >
          {state?.map(index =>(
              <img className="hotel-img" src={index.logo} alt="" onClick={() => handNextBedrooms(index.id_hotel)}  />
          ))}
      </div>
    )

}
export default Store