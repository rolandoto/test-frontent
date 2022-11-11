import React, { useEffect }  from "react"
import { useSelector } from "react-redux"
import {useParams} from "react-router-dom"
import useStoreAction from "../../action/useStoreAction"
import useProgress from "../../hooks/useProgress"
import StoreTemplate from "../../templates/Store"
import LineProgress from "../../Ui/LineProgress"

const DetailStoreRecepcion =() =>{
    const {id}  = useParams()
    const {progress}= useProgress({id})
    const {getStoreById} = useStoreAction()
    const  {Store,loading,error
                 } =useSelector((state) => state.StoreAdmin)

    const fetchData = async() =>{
        getStoreById({id})
    }

    useEffect(() =>{
        fetchData()
    },[id])

    const fillContent =() =>{
        if(progress <100){
            return  <LineProgress progress={progress} />
        } 
        if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>{error}</p>
        }

    return <StoreTemplate Store={Store} />
    
    }

    return   (
        <>{fillContent()}</>
    )


}

export default DetailStoreRecepcion