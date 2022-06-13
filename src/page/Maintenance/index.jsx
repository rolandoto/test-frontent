import  React, { useCallback, useEffect, useState }  from "react"
import { useDispatch, useSelector } from "react-redux"
import TableMaintenance from "../../component/TableMaintenance"
import UseUsers from "../../hooks/UseUser"
import { addPostMaintenance, getPostMaintenance, updatePostmaintenance } from "../../store/slice"


const Maintenance =() =>{

    const {jwt} = UseUsers()

    const dispatch = useDispatch()
    const [successful, setSuccessful] = useState(false);

    const {maintenance,status} = useSelector((state) => state.listBooking)

    const handSubmit= useCallback(async({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty}) =>{
        setSuccessful(false);
            await dispatch(addPostMaintenance({id_hotel,id_user_recepcion,id_user_mantenimiento,room,novelty})).unwrap().then(() => {
                        setSuccessful(true);
                })
                .catch(() => {
                setSuccessful(false);
                });
                alert("agregado")
        },[])
    
    const handUpdate = useCallback(async ({e}) =>{
        setSuccessful(false);
        await dispatch(updatePostmaintenance({id:e,options:"2"})).unwrap().then(() =>{
                        setSuccessful(true);
                    }).catch(() => {
                        setSuccessful(false);
                    });
        alert("se borrado")
    },[])

    useEffect(() =>{
        dispatch(getPostMaintenance({id:jwt.result.id_hotel}))    
    },[successful,setSuccessful])


    console.log(successful)

   if(!maintenance?.link)  return  null

    return (
        <div>
              <TableMaintenance data={maintenance} handUpdate={handUpdate} handSubmit={handSubmit} />    
        </div>
    )
}
export default Maintenance