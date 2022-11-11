import React ,{useEffect } from "react"
import "./index.css"
import {useParams}  from "react-router-dom"
import useStoreAction from "../../action/useStoreAction"
import { useSelector } from "react-redux"
import useProgress from "../../hooks/useProgress"
import DetailStoreTemplate from "../../templates/DetailStore"
import LineProgress from "../../Ui/LineProgress"

const DetailStore =() =>{
    const {id}  = useParams()
    const {progress} = useProgress({id})
    const {getStoreById} = useStoreAction()
    const  {Store,loading,error
                        } =useSelector((state) => state.StoreAdmin)

    
    const fetchData = async() =>{
        await getStoreById({id})
    }

    useEffect(() =>{    
        fetchData()
    },[id])

    const  fillContent =() =>{
        if(progress <100){
            return <LineProgress  progress={progress}  />
        }
        if(loading) {
            return <p>...Cargando</p>
        }
        if(error) {
            return <p>Error</p>
        }
    
        return  <DetailStoreTemplate id={id} fetchData={fetchData} Store={Store} />
    }   

    return (
        <div>
            {fillContent()}
        </div>
    )

}
export default DetailStore