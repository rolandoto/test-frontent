import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";

const Autoconext = React.createContext({})


export const AutoProvider =({children}) =>{

    const socket = io.connect("https://railway.grupo-hoteles.com");

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

    useEffect(()=>{
        socket.on("ExitPms", (data) => {
            setJwt(null)
            console.log(data)
            window.location.href="/"
        })
    },[socket])

    const stateCart = {
        cart:[]
      }

    const [qty, setQty] = useState(1);

    const [carts,setCarts] =useState(stateCart)
    const [update,setUpadte] = useState(false)
    const [isOpen, setIsOpen] = useState(false);

    const [category,setCategory] =useState({
        Forma_pago:0
    })

    
    return (
            <Autoconext.Provider value={{jwt,
                                        setJwt,
                                        name,
                                        setName,
                                        show,
                                        setShow,
                                        carts,
                                        setCarts,
                                        qty, 
                                        setQty,
                                        update,
                                        setUpadte,
                                        category,
                                        setCategory,
                                        setIsOpen,
                                        isOpen,
                                        socket}}>
                {children}
            </Autoconext.Provider>
    )
}
export default Autoconext