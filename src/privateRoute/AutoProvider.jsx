import React, { useEffect, useState } from "react";


const Autoconext = React.createContext({})

export const AutoProvider =({children}) =>{

    const [name,setName] = useState(
        () => window.sessionStorage.getItem('name')
    )
    const [jwt,setJwt] =useState( 
            () => sessionStorage.getItem('jwt') 
        )

    const [show,setShow]= useState(false)
    
    useEffect(() =>{
        setShow(false) 
    },[jwt])


    return (
        <Autoconext.Provider value={{jwt,setJwt,name,setName,show,setShow}}>
            {children}
        </Autoconext.Provider>
    )
}

export default Autoconext