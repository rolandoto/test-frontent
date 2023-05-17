import React, { useEffect, useState } from "react";
const Autoconext = React.createContext({})

export const AutoProvider =({children}) =>{

    const [name,setName] = useState(
        () => window.localStorage.getItem('name')
    )
    
    const [jwt,setJwt] =useState( 
            () =>  JSON.parse(localStorage.getItem('jwt')) 
    )

    const [show,setShow]= useState(false)
    
    useEffect(() =>{
        setShow(false) 
    },[setJwt])

    const stateCart = {
        cart:[]
      }

    const [qty, setQty] = useState(1);

    const [carts,setCarts] =useState(stateCart)
    const [update,setUpadte] = useState(false)


    return (
            <Autoconext.Provider value={{jwt,setJwt,name,setName,show,setShow,carts,setCarts,qty, setQty,update,setUpadte}}>
                {children}
            </Autoconext.Provider>
    )
}
export default Autoconext