import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ServiceBictacoras } from "../service/ServiceListBictacoras"
import { setBitca } from "../store/slice/Bictacoras"
import UseUsers from "./UseUser"


const UserListBictacoras =() =>{
    
    const [loading,setLoading] = useState(true)
    const dispath = useDispatch()
    const {bicta}=  useSelector((state) =>state.bictacoras)
    const {jwt}  = UseUsers()
    const id =jwt.result.id_hotel
    
    useEffect(() =>{
        ServiceBictacoras({id}).then(index=>{
            setLoading(false)
            dispath(setBitca(index))
        }).catch(e =>{
            setLoading(true)
            console.log(e)
        })
    },[])

    return {
        bicta,
        isLoading:loading
    }

}
export default UserListBictacoras