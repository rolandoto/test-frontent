import { useEffect, useState } from "react"


const UseDocument =() =>{

    const [document,setDocument] =useState()

    useEffect(() =>{
        fetch("https://grupohoteles.co/api/getTipeDocument")
        .then((response) =>{
            if(!response.ok){
                throw new Error('Network response was not ok',response.status);
            }

            return response.json()
        }).then((data) =>setDocument(data))
        .catch((error) =>  console.error(error))
    },[setDocument])

    return {document}


}

export default UseDocument