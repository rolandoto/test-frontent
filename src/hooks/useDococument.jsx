import { useEffect, useState } from "react"






const UseDocument =({itemId="1"}) =>{

    const [state,setState] =useState()

    useEffect(() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
      .then(response  =>{
        if(!response.ok){
            throw new Error("ERROR HTP"+ response.status)
        }
        return response.json()
      })
     .then(data => setState(data))
    .catch((error) => console.error(error))
    },[])

    const  finDocument = state?.find((itemDocument) => itemDocument.ID ==itemId)

    return [finDocument]



}


export default UseDocument