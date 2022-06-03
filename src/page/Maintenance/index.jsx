import  React, { useCallback, useEffect }  from "react"
import { useDispatch, useSelector } from "react-redux"
import TableMaintenance from "../../component/TableMaintenance"
import UseUsers from "../../hooks/UseUser"
import { addPostMaintenance, getPostMaintenance, updatePostmaintenance } from "../../store/slice"


const Maintenance =() =>{

    const {jwt} = UseUsers()

    const dispatch = useDispatch()

    const {maintenance,status} = useSelector((state) => state.listBooking)

    const handSubmit= useCallback(async({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}) =>{
        await dispatch(addPostMaintenance({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}))
        await dispatch(getPostMaintenance({id:jwt.result.id_hotel}))
        alert("agregado")
    },[])
    
    const handUpdate = useCallback(async ({e}) =>{
        await dispatch(updatePostmaintenance({id:e,options:"2"}))
        await dispatch(getPostMaintenance({id:jwt.result.id_hotel}))
        alert("se borrado")
    },[])

    useEffect(() =>{
        dispatch(getPostMaintenance({id:jwt.result.id_hotel})) 
           
    },[])
   if(!maintenance?.link)  return  null

    return (
        <div>
              <TableMaintenance data={maintenance} handUpdate={handUpdate} handSubmit={handSubmit} />    
        </div>
    )

}

export default Maintenance