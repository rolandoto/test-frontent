import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom"
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import useProgress from "../../hooks/useProgress";
import DetailDasboard from "../../organisms/DetailDashboard";
import LineProgress from "../../Ui/LineProgress";
import moment from "moment/moment";
import useDetailRoomAction from "../../action/useDetailRoomAction";
import useTarifasReservationActions from "../../action/useTarifasReservationActions";
import useApiWhataapActions from "../../action/useApiWhataapActions";


const DetailDashboard =() =>{
    const {id} = useParams()    
    const {progress} = useProgress({id})
    const [loadingDetail,setLoadingDetail] =useState(false)
    const {getDetailReservationById} = useDetailDashboardAction()
    const {postDetailRoom} =  useDetailRoomAction()
    const {PostTarifasReservationById}=useTarifasReservationActions()
    const  {postWhataapByIdSolicitud} =useApiWhataapActions()   
    const {loading,error,DetailDashboard
                } = useSelector((state) => state.DetailDashboard)
    const fetchData =async() =>{
        await getDetailReservationById({id})
    }

    const fetchWhatsapp =async({to})=>{
        await postWhataapByIdSolicitud({to})
    }

    const handClickLoading =() =>{
        setLoadingDetail(!loadingDetail)
    }

    const postInsertTarifas = async({id_user, id_hotel,valor, Description,Fecha, ID_reservation,name_reservation,codigo_reserva,noches,Abono}) =>{
        console.log(id_user)
        await PostTarifasReservationById({
            id_user,
            id_hotel,
            valor,
            Description,
            Fecha,
            ID_reservation,
            name_reservation,
            codigo_reserva,
            noches,
            Abono})
    }

    useEffect(() =>{
        fetchData()
    },[loadingDetail])


    const fillConten =() =>{

        if(progress < 100){
            return <LineProgress progress={progress} />
    }if(loading){
        return <p>...Cargando</p>
    }
 
    return    <DetailDasboard  
                    postDetailRoom={postDetailRoom}                
                    DetailDashboard={DetailDashboard} 
                    fetchData={fetchData} 
                    postInsertTarifas={postInsertTarifas}
                    handClickLoading={handClickLoading}
                    fetchWhatsapp={fetchWhatsapp}
                    
                    />}

    return (
        <>
           {fillConten()}
        </>
    )

}

export default DetailDashboard