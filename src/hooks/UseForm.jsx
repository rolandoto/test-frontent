import { useState } from "react"


const UseForm =({name,lastName,phone,date}) =>{

    const [datos, setDatos] = useState({
        nombre: name,
        apellido: lastName,
        celular:phone,
        fecha:date
    })

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    return {
        handleInputChange,
        datos
    }

}

export default UseForm.use