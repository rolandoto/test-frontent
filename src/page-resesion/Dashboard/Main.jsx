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

    

    return (
        <>
       <Dashboard />
        </>
    )
    

}

export default MainDasboard