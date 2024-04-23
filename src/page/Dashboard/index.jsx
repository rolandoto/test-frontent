import React, { useContext, useEffect } from "react"
import ContainerGlobal from "../../Ui/ContainerGlobal"
import "./style.css"
import { motion } from "framer-motion";
import WebVitals from "../../component/Web-vital";
import CardPorcentaje from "../../component/CardProcentaje";
import CardToday from "../../component/CardToday";
import CardReservationActivity from "../../component/CardReservationActivity";
import UserPorcentajeOccupation from "../../action/UserPorcentajeOccupation";
import  AutoProvider  from "../../privateRoute/AutoProvider";
import { useSelector } from "react-redux";
import useProgress from "../../hooks/useProgress";
import moment from "moment";
import DashboardStatisticsOrganism from "../../organisms/DashboardStatistics";
import LineProgress from "../../Ui/LineProgress";
import useInformDashboardMetricas from "../../action/useInformDashboardMetricas";

const Dashboardstatistics=() =>{

    const {getOccupationPorcentaje} =UserPorcentajeOccupation()
    const {PostByIdhotelInforme} =useInformDashboardMetricas()
  
    const {progress} = useProgress({id:"1"})
    const  now = moment().format("YYYY-MM-DD");
    const {loading,error,occupation
    } = useSelector((state) => state.OccupationPorcentajeSlice)

    const {InformeMonth,errorDashboard,loadingDashboard} = useSelector((state) => state.InformeDashboardSlice)
  
    const { jwt } = useContext(AutoProvider);

    
    
    const fetchData = async () => {
        if (jwt && jwt.result && jwt.result.id_hotel) {
            await getOccupationPorcentaje({ fecha: now, idHotel: jwt.result.id_hotel });
        } else {
            console.error("El token JWT está ausente o no contiene la propiedad 'id_hotel'.");
         
        }
    }

    const fetchDataFecha =async() =>{
        await PostByIdhotelInforme({id:jwt.result.id_hotel,fecha:"2024-04-01"})
    }

    const { Available,Block,Occupation,NumReservation,NumBlock,NumAvailable } = occupation;
   
    useEffect(() =>{
        fetchData()
        fetchDataFecha()
    },[ jwt.result.id_hote])


    const fillContent =() =>{

        if(progress < 100){
            return <LineProgress progress={progress} />
        }if(loading){
            return <p>...Cargando</p>
        }if(loadingDashboard){
            return <p>...Cargando</p>
        }if(error){
            return <p>no found</p>
        }if(errorDashboard){
            return <p>no found</p>
        }
 
        return <DashboardStatisticsOrganism
                Available ={Available}
                Block={Block}
                Occupation={Occupation}
                NumReservation={NumReservation}
                NumBlock={NumBlock}
                NumAvailable={NumAvailable} 
                InformeMonth={InformeMonth}
                 />
    }



    return fillContent()
     
}

export default Dashboardstatistics

/**
 * 
                                   
 * 
 */