import  React, { useCallback, useEffect, useState }  from "react"
import { useDispatch, useSelector } from "react-redux"
import TableMaintenance from "../../component/TableMaintenance"
import UseTitle from "../../hooks/UseTitle"
import UseUsers from "../../hooks/UseUser"
import { addPostMaintenance, getPostMaintenance,  } from "../../store/slice"


const Maintenance =() =>{

    const {jwt} = UseUsers()

    UseTitle({title:"Mantenimiento"})

    const dispatch = useDispatch()
    const [successful, setSuccessful] = useState(false);
   



    return (
        <div>
              <TableMaintenance />    
        </div>
    )
}
export default Maintenance