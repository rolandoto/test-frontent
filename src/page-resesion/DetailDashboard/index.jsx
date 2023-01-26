import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import useProgress from "../../hooks/useProgress";
import DetailDasboard from "../../organisms/DetailDashboard";
import LineProgress from "../../Ui/LineProgress";
import moment from "moment/moment";

const DetailDashboard =() =>{
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
 
    return    <DetailDasboard  DetailDashboard={DetailDashboard} fetchData={fetchData} />

    }

    return (
        <>
           {fillConten()}
        </>
    )

}

export default DetailDashboard