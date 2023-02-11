import React, { useState } from "react";
import { useEffect } from "react";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import LineProgress from "../../Ui/LineProgress";
import ReservasUpdate from "./ReservasUpdate";
import { useParams } from "react-router-dom";
import useProgress from "../../hooks/useProgress";
import { useSelector } from "react-redux";


const UpdateRservation =() =>{
    const {id} = useParams()    
    const {progress} = useProgress({id})
    const {getDetailReservationById} = useDetailDashboardAction()
    const {loading,error,DetailDashboard
                } = useSelector((state) => state.DetailDashboard)

    const fetchData =async() =>{
        await getDetailReservationById({id})
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
 
    return    <ReservasUpdate  DetailDashboard={DetailDashboard} fetchData={fetchData} />}

    return (
        <>
           {fillConten()}
        </>
    )

}

export default UpdateRservation