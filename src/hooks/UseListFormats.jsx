import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFormat } from "../store/slice"




const UseListFormats =({id_hotel}) =>{
    const dispatch = useDispatch()
    
    const { entities, loading }= useSelector((state) => state.listBooking)
    
    useEffect(() => {
      dispatch(getFormat({id_hotel}))
    }, [])

    return {data:entities,loading}

}

export default UseListFormats