import { useEffect, useState } from "react"
import { config } from "../config"


const UseDocument =() =>{

    const [document,setDocument] =useState()

    useEffect(() =>{
        fetch(`${config.serverRoute}/api/resecion/getTipeDocument`)
        .then((response) =>{
            if(!response.ok){
                throw new Error('Network response was not ok',response.status);
            }

            return response.json()
        }).then((data) =>setDocument(data?.query))
        .catch((error) =>  console.error(error))
    },[setDocument])

    return {document}


}

export default UseDocument