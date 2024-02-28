import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";
import { SocketRoute } from "../config";

const Autoconext = React.createContext({})

export const AutoProvider =({children}) =>{

 //   https://railway.grupo-hoteles.com
    const socket = io.connect(`${SocketRoute.serverRoute}`);

    const [name,setName] = useState(
        () => window.localStorage.getItem('name')
    )
    
    const [jwt,setJwt] =useState( 
            () =>  JSON.parse(localStorage.getItem('jwt')) 
    )


    const [Dian,setDian] =useState( 
        () =>  JSON.parse(localStorage.getItem('tokenDian')) 
)

    const [show,setShow]= useState(false)

    const [ocacion,setOcacion] =useState("")
    const [finish,setFinish] =useState("")

    /*const momentoSalida = moment(finish, "HH:mm:ss");
       
        const diferencia = momentoSalida.diff(tiempoActual);
       
        const horas = Math.floor(diferencia / (60 * 60 * 1000));
        const minutos = Math.floor((diferencia % (60 * 60 * 1000)) / (60 * 1000));
        const segundos = Math.floor((diferencia % (60 * 1000)) / 1000);
*/
    
    useEffect(() =>{
        setShow(false) 
    },[setJwt])

   

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
                                        socket,
                                        setOcacion,
                                        ocacion,
                                        finish,
                                        setFinish,
                                        setDian,
                                        Dian}}>
                {children}
            </Autoconext.Provider>
    )
}
export default Autoconext