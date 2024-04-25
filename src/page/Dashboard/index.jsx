import React, { useContext, useEffect, useState } from "react"
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
import { Progress, Grid } from "@nextui-org/react";

const Dashboardstatistics=() =>{

    const {getOccupationPorcentaje} =UserPorcentajeOccupation()
    const {PostByIdhotelInforme} =useInformDashboardMetricas()
  
    const {progress} = useProgress({id:"1"})
    const  now = moment().format("YYYY-MM-DD");
    const [selectedDay, setSelectedDay] = useState(moment());

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
        await PostByIdhotelInforme({id:jwt.result.id_hotel,fecha:selectedDay})
    }

    const { Available,Block,Occupation,NumReservation,NumBlock,NumAvailable } = occupation;
   
    useEffect(() =>{
        fetchData()
        fetchDataFecha()
    },[ jwt.result.id_hote,selectedDay])


    const fillContent =() =>{

        if(progress < 100){
            return <LineProgress progress={progress} />
        }if(loading){
            return  <Grid.Container xs={50} sm={20} gap={2}>
            <Grid>
              <Progress
                indeterminated
                value={50}
                color="success"
                status="success"
              />
            </Grid>
          </Grid.Container>
        }if(loadingDashboard){
            return <Grid.Container xs={50} sm={20} gap={2}>
            <Grid>
              <Progress
                indeterminated
                value={50}
                color="success"
                status="success"
              />
            </Grid>
          </Grid.Container>
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
                selectedDay={selectedDay} 
                setSelectedDay={setSelectedDay}
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