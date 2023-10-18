import React, { useEffect, useState } from "react"
import useProgress from "../../hooks/useProgress"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import useSearchUser from "../../action/useSearchUserAction"
import LineProgress from "../../Ui/LineProgress"
import DashboardModal from "./DashboardModal"

const MainCreateRerva =() =>{

    const {postSearchUsers} =  useSearchUser()
    const {id} = useParams()
    const {progress} = useProgress({id})
    const {search,loading}= useSelector((state) => state.SearchUsers)
    const [loadingDetail,setLoadingDetail] =useState(false)

    const fetchData =async() =>{
        await postSearchUsers({serchvalue:id,type:"document"})
    }
    useEffect(() =>{
        fetchData()
    },[])

  

    const fillConten =() =>{
        if(progress <100){
            return <LineProgress progress={progress} />  
        }
        if(loading){
            return <p>...Cargando</p>
        }
        
 
    return <DashboardModal 
            search={search}
            />
}


    return (fillConten())


}

export default MainCreateRerva