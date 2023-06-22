import React, { useEffect } from "react"
import useReservationActions from "../../action/useReservationActions"
import { useAppSelector } from "../../hooks/redux"
import Dashboard from "."
import useProgress from "../../hooks/useProgress"
import LineProgress from "../../Ui/LineProgress"
import { useParams } from "react-router-dom/cjs/react-router-dom"
import moment from "moment"

const MainDasboard =() =>{
    const id = useParams()
    const  {getPostByReservation,getPost} =useReservationActions()
	const { loading,Items,error} = useAppSelector((state) => state.ReservationSlice)
    const {progress} = useProgress({id:id})
	const {query} = Items

    const fetchData =async() =>{
        await getPostByReservation()
    }   

    useEffect(() =>{
        fetchData()
    },[id])

    
    const fillConten =() =>{
        if(progress <100){
            return <LineProgress progress={progress} />  
        }
        if(loading){
            return <p>...Cargando</p>
        }
        if(error){
            return <p>...{error}</p>
        }

        return  
    }


    return (
        <>
       <Dashboard />
        </>
    )
    

}

export default MainDasboard