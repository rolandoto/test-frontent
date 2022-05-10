import { useCallback, useState } from "react"
import { ServiceReservas } from "../service/ReservasService"



const UseReservas =() =>{

    const [booking,setBookin] = useState()
    const [loading,setLoading] = useState({loading:false,error:false})

    const handBookin =useCallback(({id}) =>{
        setLoading({loading:true,error:false})
        ServiceReservas({id}).then(index =>{
            setBookin(index)
            setLoading({loading:false,error:false})
        }).catch(e =>{
            setLoading({error:true})
        })
    },[])

    return {
        handBookin,
        booking,
        isLoading:loading.loading,
        isError:loading.error
    } 
}

export default UseReservas