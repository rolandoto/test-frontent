import React, { useEffect } from "react"
import { Table } from '@nextui-org/react';
import "./style.css"
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useDetailDashboardAction from "../../action/useDetailDashboardAction";
import { useDispatch, useSelector } from "react-redux";
import PageBack from "../../component/PageBack";
import LineProgress from "../../Ui/LineProgress";
import useProgress from "../../hooks/useProgress";
import CardHuesped from "../../component/CardHuespedes";


const Huespedbreakfast =() =>{
    const dispatch =useDispatch()
    const {id} = useParams()
    const {GetHuesped,getDetailReservationById,GetBreakHuespedBreaskfast} =useDetailDashboardAction()
    const {DetailDashboard,
        huesped,
        error,
        loading
    } = useSelector((state) => state.DetailDashboard)

    const {progress} = useProgress({id})
    
    const fetchData =async() =>{
        await  GetHuesped({id})
        await  getDetailReservationById({id})
        await  GetBreakHuespedBreaskfast({id})
    } 

    const FillConten =() =>{
        if(progress < 100){
            return <LineProgress progress={progress} />
        }if(loading){
            return <p>...cargando</p>
        }if(error){
            return  <PageBack />
        }
        return  <CardHuesped
                    DetailDashboard={DetailDashboard}
                    huesped={huesped} />
    }

    useEffect(() =>{
          fetchData()
    },[dispatch])
    
    return (<>{FillConten()}</>)

}

export default Huespedbreakfast